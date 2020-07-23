import React from 'react'
import { useHistory } from 'react-router-dom'

export default function AccessoryViewPage(props) {
    const sku = (sessionStorage.getItem("sku") != null) ? JSON.parse(sessionStorage.getItem("sku")) : {}
    const history = useHistory()
    return (
        <div>
                <h3 className={"m-3"}>{sku.product != null && sku.product.name}</h3>
                <h5 className={"m-3 text-secondary"}>{sku.code}</h5>

                <table className={"table"}>
                    <tr>
                        <td>Stok</td>
                        <td>{sku.stock.qty}</td>
                    </tr>
                    <tr>
                        <td>Min</td>
                        <td>{sku.stock.minimum_qty}</td>
                    </tr>
                    <tr>
                        <td>Harga Beli</td>
                        <td>{sku.price.buying_price}</td>
                    </tr>
                    <tr>
                        <td>Harga Jual</td>
                        <td>{sku.price.selling_price}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button
                                onClick={()=>{
                                    sessionStorage.setItem("sku",JSON.stringify(sku))
                                    history.push("/accessories/update")
                                }}
                                className={"btn btn-primary"}>
                                    UBAH
                            </button>
                        </td>
                    </tr>

                </table>
        </div>
    )
}