import React, { useState, useEffect } from 'react'

export default function CustomerForm(props) {
    const className = props.className
    const [name , setName] = useState(props.name)
    const [data , setData] = useState({})
    function handleFormChange(data) {
        if(props.handleFormChange != null) {
            props.handleFormChange(data)
        }
    }
    useEffect(()=>{
        data.name = name
        handleFormChange(data)
    },[name])
    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }
    return (
            <table className={className}>
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>
                            <input 
                                required={true}
                                onChange={handleChange(setName)} 
                                type={"text"}
                                value={name}
                                className={"form-control"} /> 
                        </td>
                    </tr>
                    {props.children}
                </tbody>
            </table>
    )
}