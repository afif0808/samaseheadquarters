import React ,{useState,useEffect} from 'react'
// import SKUList from '../components/sku/SKUList'
import {GetSKUs , DeleteSKUById} from '../components/sku/SKUHandler'
import { Link,BrowserRouter as Router } from 'react-router-dom'

function SKUItem(props) {
  var sku = props.sku
  const handleDeleteButton = props.handleDeleteButton 
  return (
    <tr>
      <td>{sku.product.name}</td>
      <td>{sku.code}</td>
      <td>{sku.stock.qty}</td>
      <td>
        {/* <span disabled={true} onClick={()=>{handleDeleteButton(sku.id)}} className={"btn btn-light"}>Hapus</span> */}
        <span  onClick={()=>{
          sessionStorage.setItem("sku",JSON.stringify(sku));
          window.location.href="/accessories/update"}} className={"btn btn-outline-primary font-weight-bold"}>UBAH</span>
      </td>
    </tr>
  )
}

function SKUList(props) {
  var skus = props.skus
  const handleDeleteButton = props.handleDeleteButton
  function skuItems() {
    return skus.map((sku)=> <SKUItem handleDeleteButton={handleDeleteButton} sku={sku} /> )
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


export default function AccessoriesListPage(props) {
    const [skus , setSKUs] = useState([])
    useEffect(()=>{
      if(skus.length == 0) {
        GetSKUs().then(function(resp){
          setSKUs(resp)
        })
      }
    },[skus])
    
    function handleDeleteButton(skuId) {
      DeleteSKUById(skuId).then((resp) => {
        
      })
    }    
      return (
        <div>
            <h3 className="p-3">Aksesoris</h3>
            <Link className="btn btn-primary m-3" to={"/accessories/create"}>Tambah</Link>
            <SKUList handleDeleteButton={handleDeleteButton} skus={skus} />           
        </div> 
    )
    
}