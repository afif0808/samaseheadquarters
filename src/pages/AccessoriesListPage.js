import React ,{useState,useEffect} from 'react'
// import SKUList from '../components/sku/SKUList'
import {GetSKUs , DeleteSKUById} from '../components/sku/SKUHandler'
import { Link,BrowserRouter as Router, useHistory } from 'react-router-dom'
import SearchBox from '../SearchBox'
import WhiteScreen from '../WhiteScreen'

function SKUItem(props) {
  var sku = props.sku
  let history = useHistory()
  const handleDeleteButton = props.handleDeleteButton 
  return (
    <tr>
      <td>{sku.product.name}</td>
      <td>{sku.code}</td>
      <td>{sku.stock.qty}</td>
      <td>
        {/* <span disabled={true} onClick={()=>{handleDeleteButton(sku.id)}} className={"btn btn-light"}>Hapus</span> */}
        <span 
          onClick={()=>{
            sessionStorage.setItem("sku",JSON.stringify(sku));
            history.push("/accessories/update")
          }} 
          className={"btn btn-outline-primary font-weight-bold"}>UBAH</span>
      </td>
    </tr>
  )
}

function SKUList(props) {
  var skus = props.skus
  const handleDeleteButton = props.handleDeleteButton
  function skuItems() {
    if(skus) {
      return skus.map((sku)=> <SKUItem handleDeleteButton={handleDeleteButton} sku={sku} /> )
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


export default function AccessoriesListPage(props) {
    const [skus , setSKUs] = useState(null)
    const [loaded , setLoaded] = useState(false)
    const [isAnyError , setIsAnyError] = useState(false)
    const Loader = props.loader
    useEffect(()=>{
      if(!skus) {
        GetSKUs("").then(function(resp){
          
          setSKUs(resp)
          setLoaded(true)

        }).catch((err)=>{
          setIsAnyError(true)
        })
      }
    },[skus])
    
    function handleDeleteButton(skuId) {
      DeleteSKUById(skuId).then((resp) => {
        
      })
    }
    function handleSearchSubmit(data) {
      GetSKUs(data.keyword).then(function(resp){
        setSKUs(resp)
      })
    }    
    if(loaded && !isAnyError) {
      return (
        <div>
            <h3 className="p-3">Aksesoris</h3>
            <Link className="btn btn-primary m-3" to={"/accessories/create"}>Tambah</Link>
            <SearchBox handleSubmit={handleSearchSubmit} />
            <SKUList handleDeleteButton={handleDeleteButton} skus={skus} />           
        </div> 
      )
    } else if(isAnyError) {
      return <WhiteScreen><h1>Maaf , ada masalah . Coba muat kembali lagi aja</h1></WhiteScreen>
    } else {
      return <Loader />
    }   
}