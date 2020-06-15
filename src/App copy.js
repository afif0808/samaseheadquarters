import React, { useState ,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import SKUList from './SKUList';
import { GetSKUs } from './SKUHandler';
import CreateSKUForm from './CreateSKUForm';
import QtyFormModal from './QtyFormModal';
function App(props) {
  
  const [skus , setSKUs] = useState([])
  useEffect(()=>{
    GetSKUs().then(function(resp){
      setSKUs(resp)
    })
  },[skus])

  const [skuOuts , setSKUOuts] = useState({}) 
  useEffect(()=>{

  },[skuOuts])

  function skuItemClassName(skuId){
    if(skuId) {
      return skuOuts[skuId] ? "sku-item marked" : "sku-item"
    }
    return "sku-item"
  }

  const [qtyFormModalVisible,setQtyFormModalVisible] = useState(false)
  const [qtyFormModalData , setQtyFormModalData] = useState({}) 
  function showQtyFormModal() {
    setQtyFormModalVisible(true)
  }
  function hideQtyFormModal() {
    setQtyFormModalVisible(false)
  }
  function handleSKUItemClick(sku) {
    qtyFormModalData.sku_id = sku.id
    showQtyFormModal()
    
  }

  function handleQtyFormModalOK(data) {
    alert(JSON.stringify(data))
    skuOuts[data.sku_id] = data  
    hideQtyFormModal()
  }

  return (
    <div>
        <QtyFormModal  data={qtyFormModalData} handleOK={handleQtyFormModalOK} visible={qtyFormModalVisible} />
        <SKUList skus={skus} handleItemClick={handleSKUItemClick} itemClassName={skuItemClassName} />
    </div>
  )
}

export default App;
