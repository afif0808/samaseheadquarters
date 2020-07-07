import React, { useState, useEffect } from 'react'
import { GetSKUInGroups } from '../skuingroup/SKUInGroupHandler'
import SKUInGroupItem from '../skuingroup/SKUInGroupItem'
import SKUInGroupList from '../skuingroup/SKUInGroupList'
import { useHistory } from 'react-router-dom'

export default function AccessoryInGroupListPage(props) {
    const [skuInGroups , setSKUInGroups] = useState(null)
    const history = useHistory()
    useEffect(()=>{
        if(skuInGroups==null) {
            GetSKUInGroups().then((resp)=>{
                setSKUInGroups(resp)
            })
        }
    },[skuInGroups])
    function listHeadRows() {
        return (
            <tr>
                <td>ID</td>
                <td>Suplier</td>
                <td>Tanggal</td>
                <td></td>
            </tr>
        )
    }
    function items(skuInGroups) {
        return skuInGroups.map((skuInGroup) => {
            return (
                <SKUInGroupItem key={skuInGroup.id} skuInGroup={skuInGroup}>
                        <span
                             onClick={()=>{
                                 sessionStorage.setItem("skuInGroup",JSON.stringify(skuInGroup))
                                 history.push("/accessoryingroups/view")
                             }}
                            className={"btn btn-primary"}>
                            LIHAT
                        </span>
                </SKUInGroupItem>
            ) 
        })
    }
    function list(skuInGroups) {
        if(skuInGroups != null){
            return (
                <SKUInGroupList headRows={listHeadRows()} className={"table"}>
                    {items(skuInGroups)}
                </SKUInGroupList>               
            )
        }
    }
    return (
        <div>
            <h3 className={"m-3"}>Aksesoris Masuk</h3>
            <div>
                <span 
                    onClick={()=>{
                        history.push("/accessoryingroups/add")
                    }}
                    className={"btn btn-primary m-3"}>
                    Tambah
                </span>
            </div>
            {list(skuInGroups)}
        </div>
    )
}