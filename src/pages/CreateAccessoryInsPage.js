import React, { useState, useEffect } from 'react'
import { GetSKUs } from '../components/sku/SKUHandler'
import SKUList from '../components/sku/SKUList'
import SKUItem from '../components/sku/SKUItem'
import SupplierOptions from '../components/supplier/SupplierOptions'
import { GetSuppliers } from '../components/supplier/SupplierHandler'
import QtyFormModal from '../QtyFormModal'
import BlackScreen from '../BlackScreen'
import { CreateSKUIns } from '../components/skuin/SKUInHandler'
import { useHistory } from 'react-router-dom'
import SearchBox from '../SearchBox'

export default function CreateAccessoryInsPage() {
    const [searchSKUKeyword , setSearchSKUKeyword] = useState("")
    const [skus , setSKUs] = useState(null)
    const history = useHistory()
    useEffect(()=>{
        if(skus == null) {
            GetSKUs().then((resp)=>{
                setSKUs(resp)
            }).catch((err)=>{

            })
        }
    })

    function searchSKUs(keyword) {
        GetSKUs(keyword).then(function(resp){
          setSKUs(resp)
        })
    }


    const [suppliers , setSuppliers] = useState(null)
    useEffect(()=>{
        if (suppliers == null ){
            GetSuppliers().then((resp)=>{
                setSuppliers(resp)
            }).catch((err)=>{

            }) 
        }
    },[suppliers])

    const [qtyFormModalVisible , setQtyFormModalVisible ] = useState(false)
    const [qtyFormModalCaption , setQtyFormModalCaption] = useState("")
    const [qtyFormModalQty , setQtyFormModalQty] = useState(0)

    const [saveButtonDisabled , setSaveButtonDisabled] = useState(false)

    const [pickedSKU , setPickedSKU] = useState(null)
    const [skuIns , setSKUIns] = useState({})

    const [skuInGroup , setSKUInGroup] = useState({supplier:{}})

    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }

    function handleSubmit() {
        return (e) => {
            e.preventDefault()
            setSaveButtonDisabled(true)
            skuInGroup.date = new Date(skuInGroup.date)   
            const skuInsPost = Object.keys(skuIns).map((i)=>{
                skuIns[i].date = skuInGroup.date
                skuIns[i].group = {}
                return skuIns[i]
            })
            CreateSKUIns(skuInsPost,skuInGroup).then((resp)=>{
                sessionStorage.setItem("skuInGroup",JSON.stringify(resp.sku_in_group))
                history.push("/accessoryingroups/view")
            }).catch((err)=>{

            })
        }
    }

    function skuItems(skus) {
        function editAndDeleteButton(sku) {
            if(skuIns[sku.id] != null) {
                return (
                    <span>
                        <span 
                            onClick={()=>{
                                const tempSKUIns = JSON.parse(JSON.stringify(skuIns))
                                delete tempSKUIns[sku.id]
                                setSKUIns(tempSKUIns)
                            }}
                            className={"btn btn-outline-primary font-weight-bold m-1"}>
                            x
                        </span>
                        <span 
                            onClick={()=>{
                                const qty = skuIns[sku.id].qty
                                setQtyFormModalVisible(true)
                                setPickedSKU(sku)
                                setQtyFormModalQty(qty)
                            }}
                            className={"btn btn-primary m-1"}>
                            UBAH
                        </span>
                        
                    </span>
                )
            } else {
                return null
            }
        }
        function addButton(sku) {
            if(skuIns[sku.id] == null) {
                return (
                    <span
                        onClick={()=>{
                            setQtyFormModalVisible(true)
                            setPickedSKU(sku)
                            setQtyFormModalCaption(sku.product.name)
                            setQtyFormModalQty(0)
                        }} 
                        className={"btn btn-primary font-weight-bold"}>+</span>
                )
            }
        }
        if(skus != null) {
            return skus.map((sku) => {
                var className = ""
                if(skuIns[sku.id] != null) {
                    var className = "text-primary font-weight-bold"
                }
                return (
                    <SKUItem className={className} sku={sku}>
                        <td>
                            {editAndDeleteButton(sku)}
                            {addButton(sku)}
                        </td>

                    </SKUItem>
                )
            })
        } else {
            return null
        }
    }

    function skuList(skus) {
        function headRows() {
            return (
                <tr>
                    <td>Nama</td>
                    <td>Kode</td>
                    <td>Jumlah</td>
                    <td></td>
                </tr>
            )
        }
        if(skus != null) {
            return (
                <SKUList
                    className={"table"}
                    headRows={headRows()}>
                        {skuItems(skus)}
                </SKUList>
            )    
        } else {
            return null
        }
    }

    return (
        <div>
            <BlackScreen visible={qtyFormModalVisible}>
                <QtyFormModal
                    onSubmit={(data)=>{
                        setQtyFormModalVisible(false)
                        const tempSKUIn = JSON.parse(JSON.stringify(skuIns))
                        tempSKUIn[pickedSKU.id] = {qty : parseInt(data.qty) , sku : {id:pickedSKU.id}}
                        setSKUIns(tempSKUIn)
                    }}
                    caption={qtyFormModalCaption}
                    className={"bg-white"}
                    visible={qtyFormModalVisible}
                    qty={qtyFormModalQty}
                    onCancelClick={()=>{
                        setQtyFormModalVisible(false) 
                    }}/>
            </BlackScreen>
            <h3 className={"m-3"}>Tambah Aksesoris Masuk </h3>
            <form onSubmit={handleSubmit()}>
                <div className={"form-inline"}>
                    <SupplierOptions
                        required={true}
                        onChange={(e) => {skuInGroup.supplier = JSON.parse(e.target.value)}}
                        suppliers={suppliers} 
                        className={"form-control m-3"}/>
                    <input
                        required={true}
                        onChange={(e)=>{skuInGroup.date = e.target.value;}} 
                        type={"date"} 
                        className={"form-control m-3"} />
                    <button disabled={saveButtonDisabled} type={"submit"} className={"btn btn-primary m-3"}>SIMPAN</button>
                </div>
            </form>

            <form 
                onSubmit={(e)=>{
                    e.preventDefault()
                    searchSKUs(searchSKUKeyword)
                }}
                className={"form-inline m-3"}>
                    <input 
                        type={"search"} 
                        className={"form-control"}
                        onChange={handleChange(setSearchSKUKeyword)}
                        placeholder={"Cari..."}  />
            </form>

            
            {skuList(skus)}            
       </div>
    )
}