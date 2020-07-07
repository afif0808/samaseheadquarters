import React from 'react'

export default function SKUInList(props) {
    return (
        <table className={props.className}>
            <thead>
                {props.headRows}
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}