import React, {useContext, useEffect, useState} from 'react'
import './style.scss'
import { Store } from '../App/App'
import { gql, useQuery } from "@apollo/client";
import { CSSTransition } from 'react-transition-group';
import Slider from "react-slick";


/*const JET = gql`
    query getPostByString($stringSearch: Int!) {
        jets(where: {id: $stringSearch}) {
          nodes {
            title
            jetId
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            jetDetails {
              description
              gallery {
                mediaItemUrl
              }
            }
          }
        
        }
    }`*/
    const JET = gql`
    query getPostByString($stringSearch: Int!) {
      jetBy(jetId: $stringSearch) {
          title
          jetId
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          jetDetails {
            description
            lavatory
            maximumRange
            passenger
            cabinSize
            baggageSpace
            gallery {
              mediaItemUrl
            }
            inStock
            pdfLink {
              mediaItemUrl
            }
          }
        }
  }`
export default function Modal() {
    const store = useContext(Store)
    const [DataModal, setDataModal] = useState('')
    const { data } = useQuery(JET, { variables: { stringSearch: store.JetId }})

    useEffect(() => {
        if(data){
            console.log(data);
            setDataModal(data.jetBy)  
        }
        if (DataModal) {
          store.setPassenger(DataModal.jetDetails.passenger)
          store.setCabinSize(DataModal.jetDetails.cabinSize)
          store.setMaximumRange(DataModal.jetDetails.maximumRange)
          store.setBaggageSpace(DataModal.jetDetails.baggageSpace)
          store.setLavatory(DataModal.jetDetails.lavatory)
        }
    }, [data, DataModal])

    
    //data === undefined ? null : setDataModal(data.jets.nodes[0])

    const settings = {
      customPaging: function(i) {
        if(i+1 > DataModal.jetDetails.gallery.length) return <></>
        return (<a key={i}>
              <img src={DataModal.jetDetails.gallery[i].mediaItemUrl} />
            </a>)
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };
    return (
        <CSSTransition in={store.modal} timeout={500} classNames='fade' unmountOnExit={true}>
          
          <div className="modal-container">
            <div className='title-pop'>
                <div className='title-jet'>
                <h3>{ DataModal ? DataModal.title : null}</h3>
                </div>
                <div className='close-pop' onClick={()=>{
                  store.setModal(false);
                }}>
                    <img src='/wp-content/uploads/2022/01/Exit.png'/>
                </div>
            </div>
            
            <div className="info-container">
                <div className="image-container">
                <Slider {...settings}>
                {
                    DataModal ? DataModal.jetDetails.gallery.map((items, x)=>{
                        return(
                            <div className='imgpadre' key={x}>
                                <img className='imgcarousel' src={items.mediaItemUrl} />
                            </div>
                        )
                    }): null
                }
                  
                </Slider>
                </div>
                <div className='description-container'>
                    <div className='p-description'>
                    {
                      store.modal === true ? <div className='sidebar-component-container-inner-two sidebar-modal pt-16'>
                          <div className='divide-y-2 divide-gray-400'>
                              <p className="economica info-text-title">Passenger:</p>
                              <p className="info-text-content">{store.Passenger}</p>
                          </div>
                          <div className='divide-y divide-gray-400'>
                              <p className="economica info-text-title">Cabin Size:</p>
                              <p className="info-text-content">{store.CabinSize}</p>
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
                    <p className='p-request'>
                      
                      {
                      DataModal 
                      ? DataModal.jetDetails.inStock === true 
                        ? <a className='request' href={ DataModal.jetDetails.pdfLink !== null 
                          ? DataModal.jetDetails.pdfLink.mediaItemUrl 
                          : "#" } target='__blank'>Request More Info</a> 
                        : <a className='request' href='/get-a-quote/' target='__blank'>Get in Touch</a> 
                      : null 
                      }
                    </p>
                </div>
            </div>
            
        </div>
        
        </CSSTransition>
    )
}
