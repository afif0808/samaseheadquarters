import React from "react"

export default function SupplierOptions(props) {
    // const selected = (props.selected != null) ? props.selected : null
    const className = (props.className != null) ? props.className : "" 
    function options(suppliers) {
        if (suppliers != null) {
            return suppliers.map((supplier) => {
                return <option value={JSON.stringify({id:supplier.id,name:supplier.name})}>{supplier.name}</option>
            })
        } else {
            return null
        }
    }

    if(props.suppliers != null) {
        return (
            <select disabled={props.disabled} required={props.required} onChange={props.onChange} className={className} value={props.selected}>
                <option value={""}>Pilih Suplier</option>
                {options(props.suppliers)}
            </select>
        )
    } else {
        return null
    }
}