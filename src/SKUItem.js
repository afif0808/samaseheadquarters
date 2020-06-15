import React,{useState, useEffect} from 'react'
export default function SKUItem(props) {
    var sku = props.sku
    
    function handleClick() {
        if(props.handleClick) {
            props.handleClick()
        }
    }

    return (
        <tr onClick={handleClick}>
            <td>{sku.product.name}</td>
            <td>{sku.code}</td>
            <td>{sku.stock.qty}</td>
        </tr>
    )
}
