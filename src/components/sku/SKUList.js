import React , {useState,useEffect} from 'react'
import SKUItem from './SKUItem'
import QtyFormModal from '../../QtyFormModal'

export default function SKUList(props) {
    return (
        <div>
            <table className={props.className}>
                <thead>
                    {props.headRows}
                </thead>
                <tbody>
                    {props.children}      
                </tbody>
            </table>
        </div>
    )

}