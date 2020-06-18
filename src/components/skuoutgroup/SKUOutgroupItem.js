import React from 'react'
export default function SKUOutgroupItem(props) {
    var skuOutgroup = props.skuOutgroup
    var children = props.children

    return (
        <tr>
            <td>{skuOutgroup.id}</td>
            <td>{skuOutgroup.customer.name}</td>
            <td>{skuOutgroup.date}</td>
            {children}
        </tr>
    )
}