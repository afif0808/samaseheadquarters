import React, { useState, useEffect } from 'react'
import { Link,BrowserRouter as Router, useHistory } from 'react-router-dom'
import { GetSKUOutgroups, DeleteSKUOutGroup } from '../components/skuoutgroup/SKUOutgroupHandler'
import SKUOutgroupItem from '../components/skuoutgroup/SKUOutgroupItem'
import ConfirmationModal from '../ConfirmationModal'
export default function AccessoryOutgroupsListPage() {
    const [skuOutgroups , setSKUOutgroups] = useState([])
    const [pickedSKUOutGroup, setPickedSKUOutGroup] = useState(null) 
    const [deleteSKUOutGroupModalVisible , setDeleteSKUOutGroupModalVisible] = useState(false)
    let history = useHistory()
    useEffect(()=>{
        if(skuOutgroups.length <= 0) {
            GetSKUOutgroups().then((resp)=>{
                setSKUOutgroups(resp)
            })
        }
    },[skuOutgroups])

    function deleteSKUOutGroup(skuOutgroup) {
        DeleteSKUOutGroup(skuOutgroup).then(function(resp){
            GetSKUOutgroups().then((resp)=>{
                setSKUOutgroups(resp)
            })
        })
    }

    function handleViewButtonClick(skuOutgroup) {
        return () => {      
            sessionStorage.setItem("skuOutgroup",JSON.stringify(skuOutgroup))
            history.push("/accessoryoutgroups/view")
        }
    }

    function SKUOutgroupList(skuOutgroups) {
        return skuOutgroups.map((skuOutgroup) => 
        <SKUOutgroupItem key={skuOutgroup.id} skuOutgroup={skuOutgroup}>
            <td>
                <button 
                onClick={handleViewButtonClick(skuOutgroup)} 
                className={"btn btn-primary font-weight-bold m-2"}>
                    LIHAT
                </button>
                <button
                    onClick={()=>{
                        setDeleteSKUOutGroupModalVisible(true)
                        setPickedSKUOutGroup(skuOutgroup)
                    }}
                    className={"btn btn-outline-primary m-2"}>
                    HAPUS
                </button>
            </td>
        </SKUOutgroupItem>)
    }
    return (
        <div>
            <ConfirmationModal
                handleCancelClick={()=>{
                    setDeleteSKUOutGroupModalVisible(false)
                }}
                handleOKClick={()=>{
                    deleteSKUOutGroup(pickedSKUOutGroup)
                    setDeleteSKUOutGroupModalVisible(false)
                }}
                visible={deleteSKUOutGroupModalVisible}
                text={"Apakah anda yakin ingin menghapus ini?"}/>
            <h3 className="p-3">Aksesoris Keluar</h3>
            <Link  to={"/accessoryoutgroups/add"} className="btn btn-primary m-2">Tambah</Link>
            <table className={"table"}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Vendor</td>
                        <td>Tanggal</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {SKUOutgroupList(skuOutgroups)}
                </tbody>
            </table>       
        </div>
    )
}