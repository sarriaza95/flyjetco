import React, { useContext, useState } from 'react'
import './style.scss'
import { gql, useQuery } from "@apollo/client";
import { Store } from "../App/App"

const CATEGORIES = gql`
 {
    categories {
      nodes {
        jets {
            nodes {
              jetDetails {
                inStock
              }
            }
        }
        jetCategory {
          baggageSpace
          cabinSizes
          estimatedOperatingCost
          fieldGroupName
          lavatory
          maximumRange
          passenger
        }
        id
        name
        categoryId
      }
    }
  }`

export default function Sidebar() {
    const { loading, data } = useQuery(CATEGORIES);
    const store = useContext(Store);
    const [BtnActive, setBtnActive] = useState(true);
    const [active, setActive] = useState('ALL');
    const perra = (data) => {
        const val = data.jets.nodes.filter(x => x.jetDetails.inStock === true);
        return val.length
    }

    return (
        <div className='sidebar-component-container bg-img-sidebar no-scrollbar'>
            <div className='sidebar-component-container-inner-one'>
                {

                    loading ? <div>Loading...</div>
                        : data.categories.nodes.filter(x => x.categoryId !== 1 && x.categoryId !== 9).map(category => {
                            return <div key={category.id} className=''>
                                <h3 onClick={() => {
                                    /*if (store.inStock) {
                                        store.setinStock(false);
                                    }*/
                                    store.setCurrentCategory(category.name);
                                    store.setDataCategory(category.jetCategory);
                                    setActive(category.name);
                                    store.setEstimatedcost(category.jetCategory.estimatedOperatingCost);
                                    if (store.modal === true) {
                                        store.setModal(false);
                                    }
                                }
                                }
                                    className={`text-color-cat font-Economica btn ${category.name === active ? "active" : ""}`}>
                                    {category.name} ({!store.inStock ? category.jets.nodes.length - perra(category)  : perra(category)})
                                </h3>
                            </div>
                        })
                }
                {
                    !loading ? <h4 onClick={() => {
                        store.setCurrentCategory('ALL');
                        store.setDataCategory('');

                        store.setBtnActive(false)
                        console.log(store.BtnActive)

                        
                        if (store.inStock) {
                            store.setinStock(false);
                        }

                        if (store.modal === true) {
                            store.setModal(false);
                        }
                        
                        setActive("ALL");
                    }} className={`button ${!store.BtnActive ? 'activo' : null}`}>
                        Explore All Aircraft
                    </h4> : null
                }
                {
                    !loading ? <h4 onClick={() => {
                        store.setBtnActive(true)
                        console.log(store.BtnActive)

                        if (store.inStock) {
                            store.setinStock(false);
                        }
                        else {
                            store.setinStock(true);
                        }


                        if (store.modal === true) {
                            store.setModal(false);
                        }

                    }} className={`button ${store.BtnActive ? 'activo' : null}`}>
                        View Inventory
                    </h4> : null
                }

            </div>
            {
                store.modal === true ? <div className='sidebar-component-container-inner-two pt-16'>
                    <div className='divide-y-2 divide-gray-400'>
                        <p className="economica info-text-title">Passenger:</p>
                        <p className="info-text-content">{store.Passenger}</p>
                    </div>
                    <div className='divide-y divide-gray-400'>
                        <p className="economica info-text-title">Cabin Size:</p>
                        <p className="info-text-content" dangerouslySetInnerHTML={{__html:store.CabinSize}}></p>
                    </div>
                    <div className='divide-y divide-gray-400'>
                        <p className="economica info-text-title">Maximun Range:</p>
                        <p className="info-text-content">{store.MaximumRange}</p>
                    </div>
                    <div className='divide-y divide-gray-400'>
                        <p className="economica info-text-title">Baggage Space:</p>
                        <p className="info-text-content">{store.BaggageSpace}</p>
                    </div>
                    <div className='divide-y divide-gray-400'>
                        <p className="economica info-text-title">Lavatory</p>
                        <p className="info-text-content">{store.Lavatory}</p>
                    </div>
                </div>
                    : null
            }

        </div>
    )
}
