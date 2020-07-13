import React, { useState, useEffect } from 'react'


export default function SupplierForm(props) {
    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }
    function handleFormChange(data) {
        if(props.handleFormChange != null) {
            props.handleFormChange(data)
        }
    }

    const [data,setData] = useState({})
    const [name , setName] = useState("")
    useEffect(()=>{
        data.name = name
        handleFormChange(data)
    },[name])
    var className = props.className
    return (
        <table className={className}>
            <tbody>
                <tr>
                    <td>Nama</td>
                    <td>
                        <input 
                            required={true}
                            className={"form-control"} type={"text"} 
                            onChange={handleChange(setName)} />
                    </td>
                </tr>
                {props.children}
            </tbody>
        </table>
    )
}