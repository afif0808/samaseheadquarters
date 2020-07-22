import React, { useState } from 'react'
import { UpdateStockBySKUId } from '../components/stock/StockHandler'
import { UpdateProductById } from '../components/product/ProductHandler'
import { UpdateSKUById } from '../components/sku/SKUHandler'
import { useHistory } from 'react-router-dom'
import AccessoryForm from '../accessory/AccessoryForm'
import { UpdateSKUPrice } from '../components/skuprice/SKUPriceHandler'


export default function UpdateAccessoryPage() {
    var completeSKu = JSON.parse((sessionStorage.getItem("sku")))
    let history = useHistory()
    const [sku , setSKU] = useState(completeSKu)
    function handleEditFormSubmit() {
        return (e) => {
            e.preventDefault()
            Promise.all([
                UpdateStockBySKUId(sku.stock),UpdateSKUPrice(sku.price),
                UpdateProductById(sku.product),UpdateSKUById(sku)]).then(function(resp){
                alert("Berhasil hore!")
                history.push("/accessories/list")
                console.log(resp)
            })    
        }
    }
    function handleEditFormChange(data) {
        sku.product.name = data.name
        sku.code = data.code
        sku.stock.qty = parseInt(data.qty)
        sku.stock.minimum_qty = parseInt(data.minimumQty)
        sku.price.buying_price = parseInt(data.buyingPrice)
        sku.price.selling_price = parseInt(data.sellingPrice)
    }

    return (
        <div>
            <h3 className={"m-3"}>Ubah Aksesoris</h3>
            <div>
            </div>
            <form onSubmit={handleEditFormSubmit()} >
                <AccessoryForm 
                    handleFormChange={handleEditFormChange}
                    className={"table"}
                    minimumQty={sku.stock.minimum_qty}
                    qty={sku.stock.qty}
                    code={sku.code}
                    sellingPrice={(sku.price != null) ? sku.price.selling_price : 0}
                    buyingPrice={(sku.price != null) ? sku.price.buying_price : 0}
                    name={sku.product.name}>
                    <tr>
                        <td colSpan={"100%"}>
                            <button className={"btn btn-primary m-2"}>SIMPAN</button>
                            <span onClick={()=>{window.history.back()}} className={"btn btn-outline-primary m-2"}>BATAL</span>
                        </td>
                    </tr>
                </AccessoryForm>
            </form>
            
        </div>
    )       
}

