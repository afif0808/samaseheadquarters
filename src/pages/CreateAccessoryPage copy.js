import React, { useState , useEffect } from 'react'
import CreateSKUForm from '../components/sku/CreateSKUForm'
import { CreateSKus } from '../components/sku/SKUHandler'


export default function CreateAccessory(props) {
    const [createFormCount , setCreateFormCount] = useState(1)
    const [skus , setSKUs] = useState({})

    const [saveButtonDisabled , setSaveButtonDisabled] = useState(false)



    const [massName , setMassName] = useState("")
    const [massCode , setMassCode] = useState("")
    const [massQty , setMassQty] = useState(0)

    function dataSetter(data) {
        skus[data.componentId] = data
        console.log(skus)
    }

    function createForms(value) {
        var forms = []
        for (let i = 0; i < createFormCount; i++) {
            forms.push(<CreateSKUForm productName={value.productName}  componentId={i} dataSetter={dataSetter} key={i}/>)            
        }
        return forms
    }
    function handleSubmit(event) {
        event.preventDefault()
        setSaveButtonDisabled(true)
        setSKUs({})
        CreateSKus(Object.keys(skus).map((i) => skus[i])).then((resp)=>{
            setSaveButtonDisabled(false)
            alert("Success")
            console.log(resp)
            setCreateFormCount(1)
        })
        event.preventDefault()
    }

    function MassHandler() {
        return (
            <div className="form-inline m-3">
                <input onChange={(e)=>{setMassName(e.target.value)}} type="text" className="form-control m-1" placeholder="Mass name"  />
                <input onChange={(e)=>{setMassCode(e.target.value)}} type="text" className="form-control m-1" placeholder="Mass code"  />
                <input onChange={(e)=>{setMassQty(e.target.value)}} type="number" className="form-control m-1" placeholder="Mass qty"  />
                <button onClick={()=>{applyToAll()}}>Terapkan ke semua</button>
            </div>
        )
    }
    function applyToAll() {
        var count = JSON.stringify(JSON.parse(createFormCount))
        setCreateFormCount(5)
        setTimeout(()=>{setCreateFormCount(count)},10)
        setCreateFormCount(count)
    }
    return (
        <div>
            <h3 className="m-3">Tambah Aksesoris</h3>
            <div className={"form-inline m-3"}>
                <input type={"number"} value={createFormCount} onChange={(e)=>{setCreateFormCount(e.target.value)}} className={"form-control"} />
            </div>
            <div>

            </div>
            <form onSubmit={handleSubmit}>
            {createForms({productName:massName})}
            <button disabled={saveButtonDisabled} type={"submit"} className={"btn btn-primary"}>SIMPAN</button>
            </form>
        </div>
    )
}