import React from 'react'

export default function CustomerItem(props) {
    const customer = props.customer
    if(customer != null) {
        return (
            <tr>
                <td>{customer.name}</td>
                {props.children}
            </tr>
        )
    } else {
        return null
    }
}