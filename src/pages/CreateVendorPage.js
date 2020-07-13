import React, { useState } from 'react'
import CustomerForm from '../components/customer/CustomerForm'
import { CreateCustomer } from '../components/customer/CustomerHandler'


export default function CreateVendorPage(props) {
    const [customer , setCustomer] = useState(null)
    const [loaded , setLoaded ] = useState(true)
    const [saveButtonDisabled , setSaveButtonDisabled] = useState(false)
    function handleSubmit() {
        return (e) => {
            e.preventDefault()
            setSaveButtonDisabled(true)
            CreateCustomer(customer).then((resp) => {
                alert("Berhasil Horee")
                setSaveButtonDisabled(false)

            })
        }
    }
    const Loader = props.loader
    function handleFormChange(data) {
        setCustomer(data)
    }
    return (
        <div>
            <Loader visible={loaded == false} />
            <h3 className={"m-3"}>Tambah Vendor </h3>
            <form onSubmit={handleSubmit()}>
                <CustomerForm
                handleFormChange={handleFormChange}
                className={"table"}>
                    <tr>
                        <td colSpan={2}> 
                            <button disabled={saveButtonDisabled} className={"btn btn-primary"} type={"submit"}>
                                SIMPAN
                            </button>
                        </td>
                    </tr>
                </CustomerForm>
            </form>
        </div>
    )
}