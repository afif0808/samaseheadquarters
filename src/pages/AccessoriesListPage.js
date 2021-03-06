import React ,{useState,useEffect} from 'react'
import SKUList from '../components/sku/SKUList'
import {GetSKUs , DeleteSKUById} from '../components/sku/SKUHandler'
import { Link,BrowserRouter as Router, useHistory } from 'react-router-dom'
import SearchBox from '../SearchBox'
import WhiteScreen from '../WhiteScreen'
import SKUItem from '../components/sku/SKUItem'
import ConfirmationModal from '../ConfirmationModal'
import BlackScreen from '../BlackScreen'
import DateModal from '../DateModal'
import { Config } from '../Config'




export default function AccessoriesListPage(props) {
    const [skus , setSKUs] = useState(null)
    const [loaded , setLoaded] = useState(false)
    const [loaderVisible , setLoaderVisible] = useState(false)
    const [isAnyError , setIsAnyError] = useState(false)
    const [deleteModalVisible , setDeleteModalVisible] = useState(false) 
    const [downloadModalVisible , setDownloadModalVisible] = useState(false) 
    const [skuImageViewVisible , setSKUImageViewVisible] = useState(false)
    const [pickedSKUImage ,setPickedSKUImage] = useState(null)
    const [pickedSKU , setPickedSKU] = useState(null)
    const [skuKeyword , setSKUKeyword] = useState("")
    const Loader = props.loader
    const history = useHistory()
    useEffect(()=>{
      if(!skus) {
        setLoaderVisible(true)
        GetSKUs("").then(function(resp){
          setLoaderVisible(false)
          setSKUs(resp)
          setLoaded(true)
        }).catch((err)=>{
          setIsAnyError(true)
        })
      }
    },[skus])
    function searchSKUs(keyword) {
      GetSKUs(keyword).then(function(resp){
        setSKUs(resp)
        setLoaderVisible(false)
      })
    }
    function handleSearchSubmit(data) {
      setLoaderVisible(true)
      setSKUKeyword(data.keyword)
      searchSKUs(data.keyword)
    }

    function skuImageView(visible,skuImage) {
      if(skuImage != null && visible) {
        return (
          <BlackScreen 
            onClick={()=>{
              setSKUImageViewVisible(false)
            }}
            visible={visible}>
            <img  height={400} src={Config.apiSource+"/skuimages/"+skuImage.id} />        
          </BlackScreen>
        )  
      }
      return null
    } 

    function imageThumbnail(img) {

      return (
        <img 
          width={"50"}  
          style={{background:"f00",cursor:"pointer"}} 
          height={"50"} 
          onClick={()=>{
            setSKUImageViewVisible(true)
            setPickedSKUImage(img)
          }}
          src={Config.apiSource+"/skuimages/"+img.id} />
      ) 
    
    }
    function skuItems(skus) {
      function handleEditButtonClick(sku) {
        return () => {
          sessionStorage.setItem("sku",JSON.stringify(sku));
          history.push("/accessories/update")  
        }
      }

      if(skus != null) {
        return skus.map((sku) => {
          // var className = ""
          var className = (sku.stock.qty <= sku.stock.minimum_qty) ? "text-danger font-weight-bold" : ""
          return (
             <SKUItem
              className={className} sku={sku}>
               <td>
                 {sku.images != null &&
                    imageThumbnail(sku.images[0])                 
                 }
               </td>
               <td>
                <button 
                  onClick={()=>{
                    sessionStorage.setItem("sku",JSON.stringify(sku))
                    history.push("/accessories/view")
                  }}
                  className={"btn btn-primary m-2 font-weight-bold "}>
                  {"->"}
                </button>
               </td>

             </SKUItem>
          ) 
         })
      }
      return null
    }

    function skuListHead() {
      return (
        <tr>
          <td>Nama</td>
          <td>Jumlah</td>
          <td></td>
        </tr>
      )
    }

    function downloadModal(visible) {
      return (
        <DateModal 
        date={new Date().toJSON().split("T")[0]}
        handleCancel={()=>{
          setDownloadModalVisible(false)
        }}
        handleFormSubmit={(data)=>{
          window.location.href=Config.apiSource+"/accessories/report/?date=" + data.date
          setDownloadModalVisible(false)
        }}
        visible={visible} />
      )
    }
    
    function deleteAccessory(sku) {
      DeleteSKUById(parseInt(sku.id)).then(function(resp){
        alert(JSON.stringify(resp))
        searchSKUs(skuKeyword)
      })
    }

    return (
      <div>
        {skuImageView(skuImageViewVisible,pickedSKUImage)}
        {downloadModal(downloadModalVisible)}
        <ConfirmationModal
          visible={deleteModalVisible} 
          handleOKClick={()=>{
            deleteAccessory(pickedSKU)  
            setDeleteModalVisible(false)
            searchSKUs(skuKeyword)            
          }}
          handleCancelClick={()=>{
            setDeleteModalVisible(false)
          }}
          text={"Apakah anda yakin akan menghapus ini?"} />

        <Loader visible={loaderVisible} />
        <WhiteScreen visible={isAnyError}>
          <a href='https://www.freepik.com/free-photos-vectors/background'>
            <img src={"/assets/image/error_404.jpg"}  height={"100%"} />
          </a>
        </WhiteScreen>
        <h3 className="p-3">Aksesoris</h3>
        <div style={{textAlign:"left"}}>
         <Link className="btn btn-primary m-3" to={"/accessories/create"}>Tambah</Link>
        

          <span 
            onClick={()=>{
              setDownloadModalVisible(true)
            }}
            className={"btn btn-primary text-light m-3"}>Unduh</span>
        </div>

        <SearchBox handleSubmit={handleSearchSubmit} />
        <SKUList 
        className={"table"}
        >
          {skuItems(skus)}  
        </SKUList>
     
      </div> 
    )    
}