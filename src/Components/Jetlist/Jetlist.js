import React, {useContext} from 'react'
import SortBy from '../SortBy/SortBy'
import './style.scss'
import { gql, useQuery } from "@apollo/client";
import { Store } from "../App/App"
import Modal from "../Modal/Modal"


/* const JETLIST = gql`
 {
    jets(last: 99) {
        nodes {
          title
          jetId
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
  }` */

  /*const JETLIST = gql`
    query getPostByString($stringSearch: String!) {
        jets(where: {categoryName: $stringSearch}, last: 99) {
            nodes {
            title
            jetId
            featuredImage {
                node {
                mediaItemUrl
                }
            }
            }
        
        }
    }`*/
    const JETLIST = gql`
    query getPostByString($stringSearch: String!) {
        jets(where: {categoryName: $stringSearch}, last: 99) {
            nodes {
                jetDetails {
                  inStock
                  pdfLink {
                    mediaItemUrl
                  }
                }
                title
                jetId
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
            }
        
        }
    }`
  
export default function Jetlist() {
    const store = useContext(Store);  
    const { loading, data } = useQuery(JETLIST, {fetchPolicy:"network-only", variables: { stringSearch: store.CurrentCategory } })
    
    return (
        <div className="jet-list-main-container">
        <Modal />
        
        <div className={store.modal ? `jet-list-container close` : `jet-list-container`}>
            <div><h3>{store.CurrentCategory}</h3></div>
            <div>{store.Estimatedcost}</div>
            <div className="jet-list-sort">
                <div className="sort">
                    Sort by:
                </div> 
                <div>
                    <SortBy />
                </div>
            </div>
        </div>
        <div className={store.modal ? 'modal-open no-scrollbar close' : 'jet-list-cards no-scrollbar'}>
            {
                loading ? <div>Loading...</div> 
                :  data.jets.nodes.map((items, key)=>{
                    /* return(
                        <div className="card" key = {key} value={items.jetId} onClick={()=>{
                            store.setModal(true);
                            store.setJetId(items.jetId)
                        }}>
                            <img src={items.featuredImage.node.mediaItemUrl} alt="Avatar"/>
                            <div className="inner-container">
                                <h4>{items.title}</h4>  
                            </div>
                        </div>
                    ) */
                    if(store.inStock){
                        if(items.jetDetails.inStock === true){
                            return(
                                <div className="card" key = {key} value={items.jetId} onClick={()=>{
                                    store.setModal(true);
                                    store.setJetId(items.jetId)
                                }}>
                                    <img className='img_card' src={items.featuredImage.node.mediaItemUrl} alt="Avatar"/>
                                    <div className="inner-container">
                                        <h4>{items.title}</h4>  
                                    </div>
                                </div>
                            )
                        }
                        
                    }
                    else{
                        if(items.jetDetails.inStock === true){
                            return null;
                        
                        }
                        else{
                            return(
                                <div className="card" key = {key} value={items.jetId} onClick={()=>{
                                    store.setModal(true);
                                    store.setJetId(items.jetId)
                                }}>
                                    <img src={items.featuredImage.node.mediaItemUrl} alt="Avatar"/>
                                    <div className="inner-container">
                                        <h4>{items.title}</h4>  
                                    </div>
                                </div>
                            )
                        }
                        
                    }
                })
            }
            
            
        </div>
        
        </div>
    )
}
