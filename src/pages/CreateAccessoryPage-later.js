import React, { useState , useEffect } from 'react'
import CreateSKUForm from '../components/sku/CreateSKUForm'
import { CreateSKus } from '../components/sku/SKUHandler'

function CreateAccessoryForm(props) {
    return (
        <tr>
            <td>
                <input type="text" className={"form-control"} />
            </td>        
            <td>
                <input type="text" className={"form-control"} />
            </td>        
            <td>
                <input type="number" className={"form-control"} />
            </td>        
        </tr>
    )
}

export default function CreateAccessory(props) {
    const [createFormCount , setCreateFormCount] = useState(1)
    const [skus , setSKUs] = useState([])
    const useForceUpdate = () => useState()[1];    
    function createAccessoryForms(count) {
        var forms = []
        for (let i = 0; i < count; i++) {
            var defaultProductName = ""
            var defaultSKUCode = ""
            var defaultSKUStockQty = 0
            var defaultValue = skus[i]

            if(defaultValue) {
                defaultProductName = defaultValue.productName
                defaultSKUCode = defaultValue.skuCode
                defaultSKUStockQty = defaultValue.skuStockQty

            }
            if(i==0 && count > 1) {
                forms.push(<CreateAccessoryForm productName={defaultProductName} skuCode={defaultSKUCode} defaultSKUStockQty={defaultSKUStockQty} index={i} skus={skus} isFirst={true} key={i} />)
            } else {
                forms.push(<CreateAccessoryForm productName={defaultProductName} skuCode={defaultSKUCode} defaultSKUStockQty={defaultSKUStockQty} index={i} skus={skus} key={i} />)
            }
        }
        return forms
    }
    function applyToAll() {
        var sku = JSON.parse(JSON.stringify(skus[0]))
        console.log(skus)
        var tempSKUs = []
        for (const i in skus) {
            tempSKUs[i] = skus[i]
            tempSKUs[i].productName = sku.productName
            tempSKUs[i].skuCode = sku.skuCode
            tempSKUs[i].skuStockQty = sku.skuStockQty

        }
        setSKUs(tempSKUs)
    }
    function CreateAccessoryForm(props) {
        var skus = props.skus
        var index = props.index

        if (!skus[index]){
            skus[index] = {}
        }

        function handleProductNameChange(e) {
            var sku = skus[index]
            if(sku) {
                sku.productName = e.target.value
            } else {
                skus[index] = {}
             
                skus[index].productName = e.target.value
            }
            console.log(skus)
        }
        function handleSKUCodeChange(e) {
            var sku = skus[index]
            if(sku) {
                sku.skuCode = e.target.value
            } else {
                skus[index] = {}
                skus[index].skuCode = e.target.value
            }
        }
        function handleSKUStockQtyChange(e) {
            var sku = skus[index]
            if(sku) {
                sku.skuStockQty = e.target.value
            } else {
                skus[index] = {}
                skus[index].skuStockQty = parseInt(e.target.value)
            }
            console.log(skus)
        }
        
        
        function first(yes) {
            if(yes) {
                return (
                    <span onClick={()=>{applyToAll()}} className={"btn btn-light"}>Terapkan ke semua</span>
                )
            }
        }
        return (
            <tr>
                <td>
                    <input type="text"  onChange={handleProductNameChange} defaultValue={props.productName} className={"form-control"} />
                </td>        
                <td>
                    <input type="text" onChange={handleSKUCodeChange} defaultValue={props.skuCode} className={"form-control"} />
                </td>        
                <td>
                    <input type="number" onChange={handleSKUStockQtyChange} defaultValue={parseInt(props.skuStockQty)} className={"form-control"} />
                </td>  
                <td>
                    {first(props.isFirst)}
                </td>      
            </tr>
            )        
    }
    

    function updateSKU(i,sku) {
        skus[i] = sku
    }
    function handleChange() {
       return () => {
                   
       } 
    }
   function changeFormCount(count) {
        setCreateFormCount(count)
   }
   function handleSubmit(event) {
        event.preventDefault()
        alert("why?")
        var post = skus.map((sku) => {
            var p = {}
            p.product = {name : sku.productName}
            p.sku = {code : sku.skuCode}
            p.stock = {qty : parseInt(sku.skuStockQty)}
            return p 
        })
        console.log(post)
        CreateSKus(post).then((resp)=>{
                alert("Success")
                console.log(resp)
                setCreateFormCount(1)
        })
    }
    return (
        <div>
            <h3 className="m-3">Tambah Aksesoris  </h3>
            <div className={"form-inline m-3"}>
                <input type={"number"} value={createFormCount} onChange={(e)=>{changeFormCount(e.target.value)}} className={"form-control"} />
            </div>

            <form onSubmit={handleSubmit}>
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
                    {createAccessoryForms(createFormCount)}
                </tbody>
            </table>
            <button type={"submit"}  className={"btn btn-primary"}>SIMPAN</button>
            </form>
        </div>
    )
}