import React from 'react'

export default function SKUOutItem(props) {
    var skuOut = props.skuOut
    var children = props.children
    return (
        <tr>
            <td>{skuOut.product.name}</td>
            <td>{skuOut.sku.code}</td>
            <td>{skuOut.qty}</td>
            {children}
        </tr>
    )
}