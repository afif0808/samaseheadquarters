import React,{useState, useEffect} from 'react'
export default function SKUItem(props) {
    var sku = props.sku
    var className =  (props.className != null) ? props.className : "" 
    var style = props.style
    function handleClick() {
        if(props.handleClick) {
            props.handleClick(sku)
        }
    }
    var children = props.children
    
    return (
        <tr style={style} className={className} onClick={handleClick}>
            <td>
                <strong>{sku.product.name}</strong>
                <br/>
                {sku.code}
                <br/>
            </td>
            <td>
                <strong>Stok</strong>  
                : {sku.stock.qty}
                <br/>
                <strong>Min</strong>
                : {sku.stock.minimum_qty}
            </td>
            {children}
        </tr>
    )
}
