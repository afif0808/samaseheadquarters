import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SupplierList from '../components/supplier/SupplierList'
import SupplierItem from '../components/supplier/SupplierItem'
import { GetSuppliers } from '../components/supplier/SupplierHandler'

export default function SupplierListPage(props) {
    const [suppliers , setSuppliers] = useState(null)
    useEffect(()=>{
        if(suppliers == null) {
            GetSuppliers().then((resp)=>{
                setSuppliers(resp)
            })
        }
    },[suppliers])

    function headRows() {
        return (
            <tr>
                <td>Nama</td>
            </tr>
        )
    }

    function supplierItems(suppliers) {
        if(suppliers != null) {
            return suppliers.map((supplier) => {
                return <SupplierItem supplier={supplier}></SupplierItem>
            })    
        } else {
            return null
        }
    }
    return (
        <div>
            <h3 className={"m-3"}>Suplier</h3>
            <div>
                <Link className={"btn btn-primary m-2"} to={"/suppliers/create"}>Tambah</Link>
            </div>
            <SupplierList 
                headRows={headRows()}
                className={"table"}>
                    {supplierItems(suppliers)}
            </SupplierList>
        </div>
    )
}