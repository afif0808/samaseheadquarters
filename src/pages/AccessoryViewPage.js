import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BlackScreen from '../BlackScreen'
import SKUDetail from '../components/sku/SKUDetail'
import { useFileForm } from '../filemanagement/FileUploader'
import { UploadImage } from '../components/image/ImageHandler'
import { CreateSKUImage , DeleteSKUImageByID } from '../components/skuimage/SKUImageHandler'
import { Config } from '../Config'




export default function AccessoryViewPage(props) {
    
    const history = useHistory()
    const [files,fileForm] = useFileForm()
    const [skuImages , setSKUImages] = useState(null)
    const [addImageModalVisible , setAddImageModalVisible] = useState(false)

    const [sku,setSKU] = useState((sessionStorage.getItem("sku") != null) ? JSON.parse(sessionStorage.getItem("sku")) : {})
    useEffect(()=>{
        if(sku != null) {
            if(sku.images != null) {
                setSKUImages(sku.images)
            }
        }
    },[sku])

    function showImages(images) {

        console.log(sku)
        if(images == null) {
            return null
        }
        return images.map((img,i)=>{
            if(img != null) {
                return  (
                  <div style={{width:"300px",height:"300px",float:"left",margin:"4%"}}>
                      <img src={Config.apiSource+"/skuimages/"+img.id} width={"100%"} height={"100%"}    />
                      <span 
                        style={{margin:"5px"}} 
                        onClick={()=>{
                            DeleteSKUImageByID(img.id).then(()=>{
                                const tempSKUImages = JSON.parse(JSON.stringify(skuImages))
                                tempSKUImages.splice(i,1)
                                setSKUImages(tempSKUImages)
                                sku.images = tempSKUImages
                                sessionStorage.setItem("sku",JSON.stringify(sku))
                            })
                            
                        }}
                        className={"btn btn-light border"}>HAPUS</span>
                  </div>  
                )                 
            }
        })
    }

    function deleteImage(id) {
        DeleteSKUImageByID(id).then((resp)=>{
            
        })
    }
   
    return (
        <div>
                <BlackScreen
                    visible={addImageModalVisible}>
                    <div className={"bg-white p-3"}>
                        <h5 className={"m-1"}>Unggah Foto</h5>
                        <hr />
                        <form
                            onSubmit={(e)=>{
                                e.preventDefault()
                                UploadImage(files[0]).then((resp)=>{
                                    const path = resp.path
                                    const skuImage = {
                                        sku_id : sku.id,
                                        path : path,
                                    }
                                    CreateSKUImage([skuImage]).then((resp)=>{
                                        const tempSKU = JSON.parse(JSON.stringify(sku))
                                        setAddImageModalVisible(false)
                                        if(tempSKU.images == null) {
                                            tempSKU.images = []
                                        }
                                        tempSKU.images = tempSKU.images.concat(resp)
                                        sessionStorage.setItem("sku",JSON.stringify(tempSKU))
                                        setSKU(tempSKU)
                                    })
                                })
                            }}>
                            {fileForm()}
                            <hr/>
                            <button
                                type={"submit"}
                                className={"btn btn-primary m-1"}>
                                OK
                            </button>
                            <span
                                onClick={()=>{
                                    setAddImageModalVisible(false)
                                }}
                                className={"btn btn-light border m-1"}>
                                BATAL
                            </span>
                        </form>
                        <hr/>
                    </div>
                </BlackScreen>

                <h3 className={"m-3"}>{sku.product != null && sku.product.name}</h3>
                <h5 className={"m-3 text-secondary"}>{sku.code}</h5>
                <SKUDetail
                    className={"table"} 
                    sku={sku}>
                        <tr>
                            <td colSpan={2}>
                                <span
                                    onClick={()=>{
                                        history.push("/accessories/update")
                                    }}
                                    className={"btn btn-primary m-2"}>
                                        UBAH
                                </span>
                                <span
                                    onClick={()=>{
                                        setAddImageModalVisible(true)
                                    }}
                                    className={"btn btn-primary"}>
                                        TAMBAH FOTO
                                </span>       
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {showImages(skuImages)}
                            </td>
                        </tr>
                </SKUDetail>
        </div>
    )
}