import React, { useState } from 'react'


export default function QtyFormModal(props) {
    var visible = props.visible
    const [qty,setQty] = useState(0)
    function handleChangeQty(event) {
        setQty(event.target.value)
    }

    function handleOK(event) {
        var data = props.data
        data.qty = parseInt(qty)
        if(props.handleOK) {
            props.handleOK(data)
        }
        event.preventDefault()
   
    }
    
    function modal() {
        return (
            <div className={props.className}>
                <form onSubmit={handleOK}>
                    <table className={"table"}>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <span>{props.title}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Qty</td>
                                <td>
                                    <input required={true} className={"form-control"} onChange={handleChangeQty} type="number"/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button className={"btn btn-primary"}  type={"submit"}>OK</button>
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