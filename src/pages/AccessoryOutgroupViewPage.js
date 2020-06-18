import React, { useState, useEffect } from 'react'
import SKUOutItem from '../components/skuout/SKUOutItem'
import { GetSKUOutsByGroupID } from '../components/skuout/SKUOutHandler'

export default function AcessoryOutgroupViewPage() {
    const [skuOuts , setSKUOuts] = useState([])
    const [skuOutgroup , setSKUOutgroup] = useState(JSON.parse(sessionStorage.getItem("skuOutgroup")))
    useEffect(()=> {
        if(skuOuts.length <= 0 ){
            GetSKUOutsByGroupID(skuOutgroup.id).then((resp)=>{
                setSKUOuts(resp)
            })
        }
    },[skuOuts])
    function indonesiaDateFormat(datetime) {

    }
    function dateOnly(dateTime) {
        return dateTime.split("T")[0]
    }
    function SKUOutList(skuOuts) {
        return skuOuts.map((skuOut) => {
            return <SKUOutItem key={skuOut.id} skuOut={skuOut}></SKUOutItem>
        })
    }

    return (
        <div className={"p-3"}>
            <h3>Aksesoris Keluar | A-{skuOutgroup.id} | {skuOutgroup.customer.name} </h3>
            <h5 className={"text-secondary mb-3 "}>{dateOnly(skuOutgroup.date)}</h5>
            <table className={"table"}>
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>Kode</td>
                        <td>Jumlah</td>
                    </tr>
                </thead>
                <tbody>
                    {SKUOutList(skuOuts)}
                </tbody>
            </table>
        </div>
    )

}