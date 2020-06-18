import React, { useState } from 'react'
import { UpdateStockById } from '../components/stock/StockHandler'
import { UpdateProductById } from '../components/product/ProductHandler'
import { UpdateSKUById } from '../components/sku/SKUHandler'
import { useHistory } from 'react-router-dom'


export default function UpdateAccessoryPage() {
    var completeSKu = JSON.parse((sessionStorage.getItem("sku")))
    let history = useHistory()
    const [sku , setSKU] = useState(completeSKu)
    
    function handleChange(stateSetter) {
        return (e) => {
            stateSetter(e.target.value)
        }        
    }
    function handleChangeProductName(e) {
        sku.product.name = e.target.value
    }
    function handleChangeSKUCode(e) {
        sku.code = e.target.value
    }
    function handleChangeStockQty(e) {
        sku.stock.qty = parseInt(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
            
        Promise.all([UpdateStockById(sku.stock),UpdateProductById(sku.product),UpdateSKUById(sku)]).then(function(){
            alert("Berhasil hore!")
            history.pushState("/accessories/list")

        })
    }
    return (
        <div>
            <h3 className="m-3">Ubah Aksesoris</h3>
            <form onSubmit={handleSubmit}>               
                <table className={"table"}>
                    <tr>
                        <td>Nama</td>
                        <td>
                            <input  onChange={handleChangeProductName} required={true} type={"text"} defaultValue={sku.product.name} className={"form-control"} />
                        </td>
                    </tr>
                    <tr>
                        <td>Kode</td>
                        <td>
                            <input  onChange={handleChangeSKUCode} required={true} type={"text"} defaultValue={sku.code} className={"form-control"} />
                        </td>
                    </tr>
                    <tr>
                        <td>Stok</td>
                        <td>
                            <input  onChange={handleChangeStockQty} required={true} type={"number"} defaultValue={sku.stock.qty} className={"form-control"} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"2"}>
                            <button className={"btn btn-primary font-weight-bold m-1"} type={"submit"}>SIMPAN</button>
                            <span className={"btn btn-outline-primary font-weight-bold m-1"} onClick={()=>{window.history.back()}}>BATAL</span>
                        </td>
                    </tr>

                </table>
            </form>

        </div>
    )       
}

