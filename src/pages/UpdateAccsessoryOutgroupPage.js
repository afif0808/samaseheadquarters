import React, { useState, useEffect } from 'react'
import { GetSKUOutsByGroupID, DeleteSKUOutByID, UpdateSKUOutByID, CreateSKUOuts } from '../components/skuout/SKUOutHandler'
import SKUItem from '../components/sku/SKUItem'
import { GetSKUs } from '../components/sku/SKUHandler'
import { GetCustomers } from '../components/customer/CustomerHandler'
import BlackScreen from '../BlackScreen'
import QtyFormModal from '../QtyFormModal'
import { useHistory } from 'react-router-dom'
import SearchBox from '../SearchBox'

export default function UpdateAccessoryOutgroupPage() {
    const history = useHistory()
    const [blackScreenVisible , setBlackSreenVisible] = useState(false)

    const [pickedSKU , setPickedSKU] = useState(null)
    const [pickedSKUOut , setPickedSKUOut] = useState(null)

    const [newSKUOuts , setNewSKUOuts] = useState({})

    const [customers , setCustomers] = useState([])
    useEffect(()=>{
        if(customers.length <= 0) {
            GetCustomers().then((resp)=>{
                setCustomers(resp)
            })    
        }
    },[customers])
    const [skus , setSKUs] = useState(null)
    useEffect(()=>{
        if(skus == null) {
            GetSKUs().then((resp)=>{
                setSKUs(resp)
            })
        }
    },[skus])


    
    const [skuOutgroup , setSKUOutgroup] = useState(JSON.parse(sessionStorage.getItem("skuOutgroup")))
    const [skuOutgroupCustomerId, setSKUOutgroupCustomerId] = useState(skuOutgroup.customer.id)
    const [skuOutgroupDate , setSKUOutgroupDate] = useState(skuOutgroup.date)
    

    const [skuOuts , setSKUOuts] = useState(null)
    const [skuOutsDeleteList , setSKUOutsDeleteList] = useState({})
    const [skuOutsUpdateList , setSKUOutsUpdateList] = useState({})


    useEffect(()=>{
        if(!skuOuts) {
            GetSKUOutsByGroupID(skuOutgroup.id).then((resp)=>{
                var a = {}
                for (const i in resp) {
                    a[resp[i].sku_id] = resp[i]
                }
                setSKUOuts(a)
            })
        }
    },[skuOuts])
   
    function skuList(skus) {
        
        function actionsButtons(sku) {
            function handleXButton() {
                if(newSKUOuts[sku.id]) {
                    var newSKUOutsTemp = JSON.parse(JSON.stringify(newSKUOuts))
                    delete newSKUOutsTemp[sku.id]
                    setNewSKUOuts(newSKUOutsTemp)
                } else {
                    var skuOutsTemp = JSON.parse(JSON.stringify(skuOuts))
                    skuOutsDeleteList[sku.id] = skuOutsTemp[sku.id]
                    delete skuOutsTemp[sku.id]    
                    setSKUOuts(skuOutsTemp)
                }
            }
            function handlePlusButton(sku) {
                    return (e) => {
                        setBlackSreenVisible(true)
                        setPickedSKU(sku)
                        setPickedSKUOut(null)
                    }
            }
            function handleEditButton() {
                    return (e) => {
                        setBlackSreenVisible(true)
                        setPickedSKU(sku)
                        if(skuOuts[sku.id]) {
                            setPickedSKUOut(skuOuts[sku.id])
                        } else {
                            setPickedSKUOut(newSKUOuts[sku.id])
                        }
                    }               
            }
            if(skuOuts[sku.id] || newSKUOuts[sku.id]) {
                return (
                    <div>
                        <span onClick={handleXButton} className={"btn btn-outline-primary font-weight-bold m-1"}>x</span>
                        <span onClick={handleEditButton()} className={"btn btn-primary font-weight-bold m-1 "}>UBAH</span>
                    </div>
                )    
            } else {
               return (
                    <div>
                        <span onClick={handlePlusButton(sku)} className={"btn btn-primary font-weight-bold"}>+</span>
                    </div>
               )
            }
        }

        function itemClassName(sku) {
            if(skuOuts[sku.id] || newSKUOuts[sku.id]) {
                return "text-primary font-weight-bold" 
            } else {
                return ""
            }
        }

        if(skus != null) {
            return skus.map((sku) => { return <SKUItem className={itemClassName(sku)} key={sku.id} sku={sku}>{actionsButtons(sku)}</SKUItem>})
        }

    }

    function customerOptions(customers) {    
        return customers.map(
                (customer) => {
                    return <option  key={customer.id} value={customer.id}>{customer.name}</option>
                }
            )
    }

    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }
    function jsonDateOnly(date) {
        return date.split("T")[0]
    }
    function onSubmit() {

    }
    function blackScreen(sku,skuOut) {
        var caption = ""
        var qty = 0
        if(blackScreenVisible) {
            if(!skuOut) {
                skuOut = {
                    sku_id : sku.id,
                    qty :0,
                    date : skuOutgroupDate,
                }
            } else {
                qty = skuOut.qty
            } 
            if(pickedSKU) {
                caption = sku.product.name
            }    
        } 
        function onQtyFormModalSubmit(data) {
            switch(true) {
                case skuOuts[sku.id] != null:
                    // var skuOutsTemp = JSON.parse(JSON.stringify(skuOuts))
                    skuOuts[sku.id].qty = parseInt(data.qty) 
                    skuOutsUpdateList[sku.id] = skuOut
                    break
                case skuOuts[sku.id] == null:
                    var newSKUOutsTemp = JSON.parse(JSON.stringify(newSKUOuts))
                    skuOut.qty = parseInt(data.qty)
                    newSKUOutsTemp[sku.id] = skuOut
                    setNewSKUOuts(newSKUOutsTemp)
                    break                            
            }
            setBlackSreenVisible(false)
        }
        function onQtyFormModalCancelClick() {
            setBlackSreenVisible(false)
        }
        return  <BlackScreen  visible={blackScreenVisible}>
                    <QtyFormModal 
                    caption={caption}
                    className={"bg-white"} 
                    visible={true}
                    qty={qty} 
                    onCancelClick={onQtyFormModalCancelClick}
                    onSubmit={onQtyFormModalSubmit} />
                </BlackScreen>

    }
    function handleSubmit(e) {
        e.preventDefault()
        var actions = []

        for (const k in skuOutsUpdateList) {
            actions.push(UpdateSKUOutByID(skuOutsUpdateList[k]))
        }
        for (const k in skuOutsDeleteList) {
            actions.push(DeleteSKUOutByID(skuOutsDeleteList[k].id))
        }
        var newSKUOutsPost = Object.keys(newSKUOuts).map(k => newSKUOuts[k])
        actions.push(CreateSKUOuts(newSKUOutsPost,skuOutgroup))
        Promise.all(actions).then((resp)=>{
            alert("Berhasil hore!!")
            history.push("/accessoryoutgroups/view")
        })


    }
    function handleSearchSubmit(data) {
        GetSKUs(data.keyword).then((resp)=>{
            setSKUs(resp)
        })
    }
    return (
        <div>
            {blackScreen(pickedSKU,pickedSKUOut)}
            <h3 className="m-3">Ubah Aksesoris Keluar</h3>
            <div className={"form-inline"}>
                <form onSubmit={handleSubmit} >
                    <select disabled={true} className={"form-control m-3"} value={skuOutgroupCustomerId} onChange={handleChange(setSKUOutgroupCustomerId)} required={true} className={"form-control m-3"}>
                        <option value={""}>Pilih Vendor</option>
                        {customerOptions(customers,skuOutgroup.customer.id)}
                    </select>
                    <input disabled={true} type={"date"} value={jsonDateOnly(skuOutgroupDate)} onChange={handleChange(setSKUOutgroupDate)} className={"form-control m-3"}  />
                    
                    <button 
                    type={"submit"}
                    className={"btn btn-primary font-weight-bold m-2"}>
                        SIMPAN
                    </button>

                    <span
                    onClick={()=>{history.push("/accessoryoutgroups/view")}}
                    className={"btn btn-outline-primary font-weight-bold m-2"}>
                        BATAL
                    </span>            
                </form>

            </div>
            <SearchBox handleSubmit={handleSearchSubmit} />
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
                    {skuList(skus)}
                </tbody>
            </table>
        </div>
    )

}