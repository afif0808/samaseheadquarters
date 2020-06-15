import React,{useState, useEffect} from 'react'
export default function SKUItem(props) {
    var sku = props.sku
    var className = props.className
    function handleClick() {
        if(props.handleClick) {
            props.handleClick(sku)
        }
    }
    
    return (
        <tr className={className} onClick={handleClick}>
            <td>{sku.product.name}</td>
            <td>{sku.code}</td>
            <td>{sku.stock.qty}</td>
            <td>{props.customCol}</td>
        </tr>
    )
}
