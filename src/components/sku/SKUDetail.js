import React from 'react'

export default function SKUDetail(props) {
    const sku = props.sku
    const className = props.className  
    const style = props.style  
    const children = props.children
    if(sku != null) {
        return (
            <table
                style={style} 
                className={className}>
                <tbody>
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
                    {children}
                </tbody>            
            </table>
        )    
    } else {
        return null
    }
}