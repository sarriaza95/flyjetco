import React, {createContext, useState, useEffect} from "react"
import './style.scss'
import Sidebar from '../Sidebar/Sidebar'
import Jetlist from "../Jetlist/Jetlist"

export const Store = createContext(null);
function App () {
  let params = new URLSearchParams(window.location.search);
  console.log(params.get('instock'));

  let btnExterno = params.get('instock') === 'true' ? true : null

  console.log(btnExterno)
  
  const [CurrentCategory, setCurrentCategory] =useState("ALL")
  const [DataCategory, setDataCategory] = useState("")
  const [CurrentJet, setCurrentJet] =useState("")
  const [Estimatedcost, setEstimatedcost] = useState("")
  const [modal, setModal] = useState(false); 
  const [JetId, setJetId] = useState("");
  const [inStock, setinStock] = useState(false);
  const [CountCategory, setCountCategory] = useState("");
  const [Passenger, setPassenger] = useState("");
  const [CabinSize, setCabinSize] = useState("");
  const [MaximumRange, setMaximumRange] = useState("");
  const [BaggageSpace, setBaggageSpace] = useState("");
  const [Lavatory, setLavatory] = useState("");
  const [BtnActive, setBtnActive] = useState(btnExterno);

  
useEffect(() => {
  if (btnExterno) {
    setinStock(true);
  }
}, [btnExterno]) 
  
  return (
    <>
    <Store.Provider value={{
      CurrentCategory,
      setCurrentCategory, 
      CurrentJet, 
      setCurrentJet, 
      DataCategory, 
      setDataCategory,
      Estimatedcost,
      setEstimatedcost,
      modal,
      setModal,
      JetId,
      setJetId,
      inStock,
      setinStock,
      CountCategory,
      setCountCategory,
      Passenger,
      setPassenger,
      CabinSize,
      setCabinSize,
      MaximumRange,
      setMaximumRange,
      BaggageSpace,
      setBaggageSpace,
      Lavatory,
      setLavatory,
      BtnActive,
      setBtnActive
      }}>
      <div className="main-container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className='main-screen-container'>
            <Jetlist />
          </div>
      </div>
    </Store.Provider>
    </>
  )
}

export default App
