import React , {useState,useEffect} from 'react'
import SKUItem from './SKUItem'
import QtyFormModal from '../../QtyFormModal'

export default function SKUList(props) {
    var skus = props.skus
    var itemClassName = () => {
        return ""
    }

    if(props.itemClassName) {
        itemClassName = props.itemClassName
    }

    var itemCustomCol = ()  => {
        return null
    }
    if(props.itemCustomCol){
        itemCustomCol = props.itemCustomCol
    }
    var handleItemClick = (sku) => {
        if(props.handleItemClick) {
            props.handleItemClick(sku)
        } 
    }
    function list() {
        if(skus) {
            return skus.map((sku) => {
                return <SKUItem customCol={itemCustomCol(sku.id)} className={itemClassName(sku.id)} handleClick={handleItemClick}  sku={sku}/>
            })    
        }
    }
    return (
        <div>
            <table className={props.className}>
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>Kode</td>
                        <td>Jumlah</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {list()}      
                </tbody>
            </table>
        </div>
    )

}