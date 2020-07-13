import React from 'react'

export default function SupplierItem(props) {
    const supplier = props.supplier
    if(supplier != null) {
        return (
            <tr>
                <td>{supplier.name}</td>
                {props.children}
            </tr>
        )    
    }
}