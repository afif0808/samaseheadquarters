import React,{useState, useEffect} from 'react'
export default function SKUItem(props) {
    var sku = props.sku
    var className =  (props.className != null) ? props.className : "" 
    function handleClick() {
        if(props.handleClick) {
            props.handleClick(sku)
        }
    }
    var children = props.children
    
    return (
        <tr className={className} onClick={handleClick}>
            <td>{sku.product.name}</td>
            <td>{sku.code}</td>
            <td>{sku.stock.qty}</td>
            <td>
                {children}
            </td>
        </tr>
    )
}
