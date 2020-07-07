import React, { useState, useEffect } from 'react'
import SKUInList from '../components/skuin/SKUInList'
import SKUInItem from '../components/skuin/SKUInItem'
import { GetSKUInsByGroupID } from '../components/skuin/SKUInHandler'
import { useHistory } from 'react-router-dom'

export default function AccessoryInGroupViewPage(props) {
    const [skuInGroup,setSKUInGroup] = useState(JSON.parse(sessionStorage.getItem("skuInGroup")))
    const [skuIns , setSKUIns] = useState(null)
    const history = useHistory()
    useEffect(()=>{
        if(skuIns == null) {
            GetSKUInsByGroupID(skuInGroup.id).then((resp)=>{
                setSKUIns(resp)
            })
        }
    },[skuIns])

    function skuInItems(skuIns) {
        if(skuIns != null) {
            return skuIns.map((skuIn)=>{
                return <SKUInItem skuIn={skuIn}></SKUInItem>
            })
        } else {
            return null
        }
    }
    function skuInHeadRows() {
        return (
            <tr>
                <td>Nama</td>
                <td>Kode</td>
                <td>Jumlah</td>
            </tr>
        )
    }
    return (
        <div>
            <h3 className={"m-3"}>Aksesoris Masuk | B-{skuInGroup.id} | {skuInGroup.supplier.name}</h3>
            <div>
                <span 
                    onClick={()=>{
                        history.push("/accessoryingroups/update")
                    }}
                    className={"btn btn-primary m-2"}>UBAH</span>
            </div>

            <SKUInList
                headRows={skuInHeadRows()} 
                className={"table"}>
                {skuInItems(skuIns)}
            </SKUInList>
        </div>
    )


}
