import React from 'react'

export default function SKUInGroupItem(props) {
    const skuInGroup = props.skuInGroup
    if(skuInGroup != null) {
        return (
            <tr>
                <td>{skuInGroup.id}</td>
                <td>{skuInGroup.supplier.name}</td>
                <td>{skuInGroup.date}</td>
                <td>
                    {props.children}
                </td>
            </tr>
        )
    } else {
        return null
    }
}