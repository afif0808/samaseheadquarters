import React from 'react'

export default function CustomerList(props) {
    const className = props.className
    const headRows = props.headRows
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
