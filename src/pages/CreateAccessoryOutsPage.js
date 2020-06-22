import React ,{useState,useEffect} from 'react'
import {GetSKUs} from '../components/sku/SKUHandler'
import {CreateSKUOuts} from '../components/skuout/SKUOutHandler'

import QtyFormModal from '../QtyFormModal'
import { GetCustomers } from '../components/customer/CustomerHandler' 
import { useHistory } from 'react-router-dom'
import SearchBox from '../SearchBox'

  export default function CreateAccessoryOutsPage() {

    const [skus , setSKUs] = useState(null)
    const [skuOuts , setSKUOuts] = useState({})
    const [skuOutDate , setSKUOutDate] = useState(null)
    const [pickedSKU , setPickedSKU] = useState(null) 
    const [screen , setScreen] = useState("accessoriesList")
    const [isSaveButtonDisabled , setIsSaveButtonDisabled] = useState(Object.keys(skuOuts).length <= 0)
    const [skuOutCustomerId , setSKUOutCustomerId] = useState(null)
    function SKUItem(props) {
      const screenSetter = props.screenSetter
      var sku = props.sku
      const [isSKUOut , setIsSKUOut] = useState(skuOuts[sku.id] != null)
      function handlePlusButton() {
        setPickedSKU(sku)
        setScreen("setSKUOutQty")
      }
      function handleEditButton() {
        setPickedSKU(sku)
        setScreen("setSKUOutQty")
      }
      function rowClass() {
        if(isSKUOut) {
         return "text-primary font-weight-bold" 
        }
      }
      function plusButton() {
        if(!isSKUOut) {
          return <span className={"btn btn-primary font-weight-bold m-1"} onClick={handlePlusButton}>+</span>
        }
      }
      function handleXButton() {
        delete skuOuts[sku.id]
        setIsSKUOut(false)
        if(Object.keys(skuOuts).length <= 0) {
          setIsSaveButtonDisabled(true)
        }
      }
      function xButton() {
        if(isSKUOut) {
          return <span onClick={handleXButton} className={"btn btn-outline-primary  font-weight-bold m-1"}>x</span>
        }
      }
      function editButton() {
        if(isSKUOut) {
          return <span onClick={handleEditButton} className={"btn btn-primary font-weight-bold m-1"}>UBAH</span>
        }
      } 
      return (
        <tr className={rowClass()}>
          <td>{sku.product.name}</td>
          <td>{sku.code}</td>
          <td>{sku.stock.qty}</td>
          <td>
            {xButton()}
            {plusButton()}
            {editButton()}
          </td>
        </tr>
      )
    }
    
    function SKUList(props) {
      var skus = props.skus
      
      const screenSetter = props.screenSetter
  
      function skuItems() {
        if(skus != null ){
          return skus.map((sku)=> <SKUItem  screenSetter={screenSetter}  sku={sku} /> )
        }
      }
    
      return (
        <table className={"table"}>
          <thead>
            <tr>
              <td>Nama</td>
              <td>Kode</td>
              <td>Jumlah</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {skuItems()}
          </tbody>
        </table>
      )
    }


    function screenSetter(screen) {
        return ()=> {
            alert("why")
            setScreen(screen)
        }
    }
    function handleItemPlusButton(sku) {
      setPickedSKU(sku)
      setScreen("setSKUOutQty")
    }

    useEffect(()=>{
      if(skus == null) {
        GetSKUs().then(function(resp){
          setSKUs(resp)
        })
      }
    },[skus])

    const [customers , setCustomers] = useState([])
    useEffect(()=>{
        if(customers.length == 0) {
            GetCustomers().then(function(resp) {
                setCustomers(resp)
            })
        }
    },[customers])

  function customerOptions(customers) {
      return customers.map(
          (customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>
          )
  }
  
  function addSKUOut(skuOut) {
    skuOuts[skuOut.sku_id] = skuOut
  }
  function handleChange(setter) {
    return (e) => {
      setter(e.target.value)
    }
  }
  function SetSKUOutQtyScreen(props) {
    const [qty , setQty] = useState((skuOuts[pickedSKU.id] ? skuOuts[pickedSKU.id].qty : 0)) 
    function handleSubmit(e) {
      e.preventDefault()
      addSKUOut({sku_id : pickedSKU.id , qty : parseInt(qty)})
      setScreen("accessoriesList")
      setIsSaveButtonDisabled(false)
    }
    
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <table className={"table"}>
            <tbody>
              <tr>
                <td className={"font-weight-bold"} colSpan={"2"}>{pickedSKU.product.name}</td>
              </tr>
              <tr>
                <td>Jumlah</td>
                <td>
                  <input onChange={handleChange(setQty)}  value={qty} min={1} required={true} placeholder={"Tentukan jumlah aksesoris keluar"} type={"number"} className={"form-control"} />
                </td>
              </tr>
              <tr>
                <td>
                  <button 
                  type={"submit"} 
                  className={"btn btn-primary font-weight-bold m-2"}>
                    SIMPAN
                  </button>
                  <span onClick={()=>{setScreen("accessoriesList")}} className={"btn btn-outline-primary m-2"}>BATAL</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </form>
    </div>
    )
  }

   function showScreen(screen) {
        switch(screen) {
            case "accessoriesList":
                return <SKUList handleItemPlusButton={handleItemPlusButton} screenSetter={screenSetter} skus={skus} />
            case "setSKUOutQty":
                return <SetSKUOutQtyScreen/>
                
        }
   }
   function saveButton() {
     if(isSaveButtonDisabled == false) {
       return <button type={"submit"} className={"btn btn-primary font-weight-bold"}>SIMPAN</button>
     } else {
        return <button disabled={true} type={"submit"} className={"btn btn-primary font-weight-bold"}>SIMPAN</button>
     }
   }
   let history = useHistory()

   function handleSubmit(e) {
     e.preventDefault()
     var skuOutsPost  = Object.keys(skuOuts).map((i)=>{
      skuOuts[i].date = new Date(skuOutDate)
      return skuOuts[i]
     })
     var skuOutgroupPost = {date : new Date(skuOutDate),customer_id : parseInt(skuOutCustomerId)}
      CreateSKUOuts(skuOutsPost,skuOutgroupPost).then(()=>{
        // window.location.href="/accessoryoutgroups/list"
        history.push("/accessoryoutgroups/list")
      })
   }
   function handleSearchSubmit(data) {
    GetSKUs(data.keyword).then((resp)=>{
        setSKUs(resp)
    })
}
    return (
        <div>
            <h3 className="p-3">Tambah Aksesoris Keluar </h3>
            <div className={"form-inline m-3"}>
                <form onSubmit={handleSubmit}>
                  <select onChange={handleChange(setSKUOutCustomerId)} required={true} className={"form-control m-3"}>
                      <option value={""}>Pilih Vendor</option>
                      {customerOptions(customers)}
                  </select>
                  <input type={"date"} required={true} className={"form-control m-3"} onChange={handleChange(setSKUOutDate)}   />
                  {saveButton()}
                </form>
            </div>
            <SearchBox handleSubmit={handleSearchSubmit}  />
            {showScreen(screen)}        
        </div> 
    )
  }