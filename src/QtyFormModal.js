import React, { useState } from 'react'
import SKUItem from './components/sku/SKUItem'


export default function QtyFormModal(props) {
    const visible = props.visible
    const className = props.className
    const caption = props.caption
    

    const onQtyChange = (e) => {
        setQty(e.target.value)
    }

    const [qty,setQty] = useState(props.qty)

    function onSubmit(e) {
        e.preventDefault()
        props.onSubmit({qty : qty})
    }
    const onCancelClick = props.onCancelClick
    
    function modal() {
        return (
            <div className={className}>
                <form onSubmit={onSubmit}>
                    <table className={"table"}>
                        <tbody>
                            <tr>
                                <td className={"font-weight-bold"} colSpan={2}>
                                    <span>{caption}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Qty</td>
                                <td>
                                    <input required={true} value={qty} className={"form-control"} onChange={onQtyChange} type="number"/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button className={"btn btn-primary m-2"}  type={"submit"}>OK</button>
                                    <span onClick={onCancelClick} className={"btn btn-outline-primary m-2 font-weight-bold"}>Batal</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </form>
            </div>
        )
    }
    if(visible) {
        return modal()
    } else {
        return null
    }
}