import React ,{useState,useEffect} from 'react'
import SKUList from '../components/sku/SKUList'
import {GetSKUs} from '../components/sku/SKUHandler'
import {CreateSKUOuts} from '../components/skuout/SKUOutHandler'

import QtyFormModal from '../QtyFormModal'
import { GetCustomers } from '../components/customer/CustomerHandler' 
function SKUListPart() {
    
}
export default function CreateAccessoryOutsPage() {
    const [qtyFormModalVisible ,setQtyFormModalVisible ] = useState(false)
    const [qtyFormModalData, setQtyFormModalData] = useState({}) 
    
    const [customers, setCustomers] = useState(null)
    useEffect(()=>{
        if(!customers) {
            GetCustomers().then((resp) => {
                setCustomers(resp)
            })                
        }
    },[customers]) 
    const [skus , setSKUs] = useState(null)
    useEffect(()=>{
        if(!skus) {
            GetSKUs().then(function(resp){
                setSKUs(resp)
            })    
        }
    },[skus])

    const [skuOuts , setSKUOuts] = useState({})

    function customerOptions(customers) {
        if(customers) {
            var options = customers.map(c => <option value={c.id}>{c.name}</option>)
            return options    
        }
    }
    function qtyFormModalHandleOK(data) {
        hideQtyFormModal()
        skuOuts[data.sku_id] = data
        setQtyFormModalData({})
    }
    function showQtyFormModal() {
        setQtyFormModalVisible(true)
    }
    function hideQtyFormModal() {
        setQtyFormModalVisible(false)
    }

    function handleItemClick(sku) {
        if(!skuOuts[sku.id]) {
            showQtyFormModal()
            qtyFormModalData.sku_id = sku.id    
        } 
    }

  
    function deleteSKUOut(id) {
        delete skuOuts[id]
    }
    
    function skuItemClassName(skuId){
        if(skuId) {
          return skuOuts[skuId] ? "sku-item marked" : "sku-item"
        }
        return "sku-item"
    }
    function skuItemCustomCol(skuId) {
        if(skuOuts[skuId]){
            return (
                <span onClick={()=>{deleteSKUOut(skuId)}} style={{fontSize:"12px"}} class={"btn btn-outline-primary font-weight-bold"}>X</span>
            )                
        } else {
            return (
                <span onClick={()=>{
                    showQtyFormModal()
                    qtyFormModalData.sku_id = skuId   
                }} style={{fontSize:"12px"}} class={"btn btn-primary font-weight-bold"}>+</span>
            )                            
        }
    }

    function handleSave() {
        console.log(Object.keys(skuOuts).map(skuOut => skuOuts[skuOut]))
        CreateSKUOuts(Object.keys(skuOuts).map(skuOut => skuOuts[skuOut]),{}).then((resp)=>{
            console.log(resp)
            alert("Success")
            setSKUOuts({})
        })
    }

    function saveButton() {
        if(Object.keys(skuOuts).length == 0) {
            return <button className={"btn btn-primary m-2"} disabled={true}>Simpan</button>
        } else {
            return <span onClick={handleSave} className={"btn btn-primary m-2"}>Simpan</span>
        }
    }
  
    return (
        <div>
            <QtyFormModal className={"a-modal"} handleOK={qtyFormModalHandleOK} data={qtyFormModalData}  visible={qtyFormModalVisible} />
            <h3 className="m-3">Tambah Aksesoris Keluar</h3>
            <div className={"form-inline"}>
                {saveButton()}
                <select className="form-control">
                    <option className="">Pilih Vendor</option>
                    {customerOptions(customers)}
                </select>
            </div>

            <SKUList itemCustomCol={skuItemCustomCol} itemClassName={skuItemClassName}  className="table" skus={skus} />
        </div>
    )

}