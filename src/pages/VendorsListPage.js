import React, { useState, useEffect } from 'react'
import { GetCustomers } from '../components/customer/CustomerHandler'
import CustomerList from '../components/customer/CustomerList'
import CustomerItem from '../components/customer/CustomerItem'
import { Link } from 'react-router-dom'

export default function VendorsListPage(props) {
    const [loaded,setLoaded] = useState(false)
    const [customers , setCustomers] = useState(null)
    const Loader = props.loader
    useEffect(()=>{
        if(customers == null) {
            GetCustomers().then((resp)=>{
                setCustomers(resp)
                setLoaded(true)
            })
        }
    },[customers])

    function headRows() {
        return (
            <tr>
                <td className={"font-weight-bold"}>Nama</td>
            </tr>
        )
    }
    function customerItems(customers) {
        if(customers != null) {
            return customers.map(customer => <CustomerItem customer={customer}></CustomerItem>)
        }
    }
    return (

        <div>
            <Loader visible={loaded == false} />
            <h3 className={"m-3"}>Vendor</h3>
            <div>
                <Link to={"/vendors/create"} className={"btn btn-primary m-2"}>Tambah</Link>
            </div>
            <CustomerList
                className={"table"}
                headRows={headRows()}>
                {customerItems(customers)}
            </CustomerList>
        </div>
    )
}