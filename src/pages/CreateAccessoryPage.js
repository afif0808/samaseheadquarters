import React, { useState , useEffect } from 'react'
import CreateSKUForm from '../components/sku/CreateSKUForm'
import AccessoryForm from '../accessory/AccessoryForm'
import { CreateSKus } from '../components/sku/SKUHandler'

export default function CreateAccessory(props) {
    const defaultAccessory = {
        stock : {
            qty:0,
            minimum_qty : 0,
        },
        product : {
            name : ""
        },
        sku : {
            code : ""
        }
    }

    const [accessory , setAccessory] = useState(defaultAccessory)
    const [saveButtonDisabled , setSaveButtonDisabled] = useState(false)
    const [accsessoryFormVisible , setAccessoryFormVisible] = useState(true)
    function handleCreateFormSubmit() {
        return (e) => {
            setSaveButtonDisabled(true)
            e.preventDefault()
            CreateSKus([accessory]).then((resp)=>{
                alert("Success")
                setAccessory(JSON.parse(JSON.stringify(defaultAccessory)))
                setSaveButtonDisabled(false)
   
            })
        }
    }
    function handleCreateFormChange(data) {
        accessory.sku.code = data.code
        accessory.product.name = data.name
        accessory.stock.qty = parseInt(data.qty)
        accessory.stock.minimum_qty = parseInt(data.minimumQty)
    }
    return (
        <div>
            <h3 className={"m-3"}>Tambah Aksesoris</h3>
            <form onSubmit={handleCreateFormSubmit()} >
                <AccessoryForm 
                    handleFormChange={handleCreateFormChange}
                    className={"table"}
                    minimumQty={0}
                    qty={accessory.stock.qty}
                    code={accessory.sku.code}
                    name={accessory.product.name}>
                    <tr>
                        <td colSpan={"100%"}>
                            <button 
                            disabled={saveButtonDisabled}
                            className={"btn btn-primary m-2"}>SIMPAN</button>
                            <span onClick={()=>{window.history.back()}} className={"btn btn-outline-primary m-2"}>BATAL</span>
                        </td>
                    </tr>
                </AccessoryForm>
            </form>
        </div>
    )

}