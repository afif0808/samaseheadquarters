import React from 'react'

export default function SupplierList(props) {
    const headRows = props.headRows
    const className = props.className
    return (
        <table className={className}>
            <thead>
                {headRows}
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}