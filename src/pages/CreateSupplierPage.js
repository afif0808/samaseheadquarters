import React, { useState } from 'react'
import SupplierForm from '../components/supplier/SupplierForm'
import { CreateSupplier } from '../components/supplier/SupplierHandler'

export default function CreateSupplierPage(props) {
    const [supplier,setSupplier] = useState(null)
    const [saveButtonDisabled , setSaveButtonDisabled] = useState(false)
    function handleSubmit() {
        return (e) => {
            e.preventDefault()
            setSaveButtonDisabled(true)
            CreateSupplier(supplier).then((resp)=>{
                alert("Success")
                setSaveButtonDisabled(false)
            })        
        }
    }
    function handleFormChange(data) {
       setSupplier(data)
    }

    const Loader = props.loader
    return (
        <div>
            <h3 className={"m-3"}>Tambah Suplier</h3>
            <form onSubmit={handleSubmit()}>
                <SupplierForm 
                    handleFormChange={handleFormChange}
                    className={"table"} >
                    <tr>
                        <td colSpan={2}>
                            <button 
                                disabled={saveButtonDisabled}
                                type={"submit"}
                                className={"btn btn-primary m-2"}>SIMPAN</button>
                        </td>
                    </tr>
                </SupplierForm>
            </form>

        </div>
    )
}