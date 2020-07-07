import React from 'react'

export default function SKUInGroupList(props) {
    const className = (props.className != null) ? props.className : ""
    return (
        <table className={className}>
            <thead>
                {props.headRows}
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}