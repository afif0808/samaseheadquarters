import React, { useState, useEffect } from 'react'
import { GetSKUs } from '../components/sku/SKUHandler'
import SKUList from '../components/sku/SKUList'
import SKUItem from '../components/sku/SKUItem'
import SupplierOptions from '../components/supplier/SupplierOptions'
import { GetSuppliers } from '../components/supplier/SupplierHandler'
import QtyFormModal from '../QtyFormModal'
import BlackScreen from '../BlackScreen'
import { CreateSKUIns, GetSKUInsByGroupID, DeleteSKUInByID, UpdateSKUInByID } from '../components/skuin/SKUInHandler'
import { useHistory } from 'react-router-dom'
import SearchBox from '../SearchBox'

export default function UpdateAccessoryInsPage() {

    const [skuInGroup , setSKUInGroup] = useState(JSON.parse(sessionStorage.getItem("skuInGroup")))
    const [skuInGroupSupplier, setSKUInGroupSupplier]  = useState(skuInGroup.supplier)
    const history = useHistory()

    const [searchSKUKeyword , setSearchSKUKeyword] = useState("")
    const [skus , setSKUs] = useState(null)
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

    const [deleteSKUIns ,setDeleteSKUIns] = useState([])
    const [updateSKUIns ,setUpdateSKUIns] = useState({})

    const [saveButtonDisabled , setSaveButtonDisabled] = useState(false)

    const [pickedSKU , setPickedSKU] = useState(null)
    const [skuIns , setSKUIns] = useState(null)
    const [newSKUIns,setNewSKUIns] = useState({})
    useEffect(()=>{
        if(skuIns == null) {
            GetSKUInsByGroupID(skuInGroup.id).then((resp)=>{
                const tempSKUIns = {}
                for (const i in resp) {
                    tempSKUIns[resp[i].sku.id] = resp[i]
                }
                setSKUIns(tempSKUIns)
            })
        }
    },[skuIns])

    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }

    function handleSubmit() {
        return (e) => {
            e.preventDefault()
            setSaveButtonDisabled(true)
            const actions = []
            for (const i in deleteSKUIns) {
                actions.push(DeleteSKUInByID(deleteSKUIns[i].id))
            }
            for (const i in updateSKUIns) {
                actions.push(UpdateSKUInByID(updateSKUIns[i].id,updateSKUIns[i]))
            }
            const skuInsArr = Object.keys(newSKUIns).map((i)=>{
                newSKUIns[i].date = skuInGroup.date
                return newSKUIns[i]
            })
            actions.push(CreateSKUIns(skuInsArr,skuInGroup))
            Promise.all(actions).then((resp)=>{
                alert("Berhasil hore!")
                setSaveButtonDisabled(false)
                history.push("/accessoryingroups/view")
            })
        }
    }

    function skuItems(skus) {
        function editAndDeleteButton(sku) {
            if(skuIns[sku.id] != null || newSKUIns[sku.id] != null) {
                return (
                    <span>
                        <span 
                            onClick={()=>{
                                if(skuIns[sku.id] != null) {
                                    const arr = JSON.parse(JSON.stringify(deleteSKUIns))
                                    arr.push(skuIns[sku.id])
                                    setDeleteSKUIns(arr)
                                }

                                const tempSKUIns = JSON.parse(JSON.stringify(skuIns))
                                delete tempSKUIns[sku.id]
                                setSKUIns(tempSKUIns)

                                const tempNewSKUIns = JSON.parse(JSON.stringify(newSKUIns))
                                delete tempNewSKUIns[sku.id] 
                                setNewSKUIns(tempNewSKUIns)


                            }}
                            className={"btn btn-outline-primary font-weight-bold m-1"}>
                            x
                        </span>
                        <span 
                            onClick={()=>{
                                if(skuIns[sku.id] != null ){
                                    setQtyFormModalVisible(true)
                                    setPickedSKU(sku)
                                    setQtyFormModalQty(skuIns[sku.id].qty)    
                                }
                                if(newSKUIns[sku.id] != null) {
                                    setQtyFormModalVisible(true)
                                    setPickedSKU(sku)
                                    setQtyFormModalQty(newSKUIns[sku.id].qty)       
                                }
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
            if(skuIns[sku.id] == null && newSKUIns[sku.id] == null) {
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
                if(skuIns[sku.id] != null || newSKUIns[sku.id] != null) {
                    var className = "text-primary font-weight-bold"
                }
                return (
                    <SKUItem className={className} sku={sku}>
                        
                        {editAndDeleteButton(sku)}
                        {addButton(sku)}

                    </SKUItem>
                )
            })
        } else {
            return null
        }
    }

    function jsonDateOnly(date) {
        return date.split("T")[0]
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
                        if(skuIns[pickedSKU.id] == null) {
                            const tempNewSKUIns = JSON.parse(JSON.stringify(newSKUIns))
                            tempNewSKUIns[pickedSKU.id] = {
                                qty : parseInt(data.qty),
                                sku : {id:pickedSKU.id},
                            }
                            setNewSKUIns(tempNewSKUIns)    
                        } else {
                            
                            const tempSKUIn = JSON.parse(JSON.stringify(skuIns))
                            tempSKUIn[pickedSKU.id].qty = parseInt(data.qty)
                            setSKUIns(tempSKUIn)
                            
                            var obj = JSON.parse(JSON.stringify(updateSKUIns))
                            obj[pickedSKU.id] = tempSKUIn[pickedSKU.id]
                            setUpdateSKUIns(obj)
                        }
                        setQtyFormModalVisible(false)

                    }}
                    caption={qtyFormModalCaption}
                    className={"bg-white"}
                    visible={qtyFormModalVisible}
                    qty={qtyFormModalQty}
                    onCancelClick={()=>{
                        setQtyFormModalVisible(false) 
                    }}/>
            </BlackScreen>
                <h3 className={"m-3"}>Ubah Aksesoris Masuk </h3>
            <form onSubmit={handleSubmit()}>
                <div className={"form-inline"}>
                    <SupplierOptions
                        required={true}
                        selected={JSON.stringify(skuInGroupSupplier)}
                        onChange={(e) => {setSKUInGroupSupplier(JSON.parse(e.target.value))}}
                        suppliers={suppliers}
                        disabled={true}
                        className={"form-control m-3"}/>
                    <input
                        required={true}
                        onChange={(e)=>{skuInGroup.date = e.target.value;}} 
                        type={"date"} 
                        disabled={true}
                        value={jsonDateOnly(skuInGroup.date)}
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