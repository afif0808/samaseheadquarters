import React from 'react'

export default function SKUInItem(props) {
    const skuIn = props.skuIn
    if(skuIn != null) {
        
        return (
            <tr>
                <td>{skuIn.sku.product.name}</td>
                <td>{skuIn.sku.code}</td>
                <td>{skuIn.qty}</td>
                {props.children}
            </tr>
        )
    } else {
        return null
    }
}