import React, { useState, useEffect } from 'react'
import BlackScreen from './BlackScreen'


export default function DateModal(props){

    function handleChange(setter) {
        return (e) =>{
            setter(e.target.value)
        }
    }
    function handleFormSubmit(data) {
        return (e) => {
            e.preventDefault()
            if(props.handleFormSubmit != null) {
                props.handleFormSubmit(data)
            }    
        }
    }
    function handleCancel() {
        return (e) => {
            if(props.handleCancel != null) {
                props.handleCancel()
            }    
        }
    }
    function handleFormChange(data) {
        if(props.handleFormChange != null) {
            props.handleFormChange(data)
        }
    }


    const visible = props.visible
    const [date,setDate] = useState((props.date != null)? props.date : null)
    useEffect(()=>{
        handleFormChange({date:date})
    },[date])

    return (
        <BlackScreen 
          visible={visible}>
            <div className={"bg-white"}>
              <form onSubmit={handleFormSubmit({date:date})}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td colSpan={2}><h4>Unduh data aksesoris</h4></td>
                    </tr>
                    <tr>
                        <td>Tanggal</td>
                        <td>
                            <input 
                                onChange={handleChange(setDate)}
                                value={date} 
                                required={true}
                                type={"date"} 
                                className={"form-control"} />
                        </td>
                    </tr>  
                    <tr>
                        <td colSpan={2}>
                        <button 
                            type={"submit"}
                            className={"btn btn-primary m-1"}>
                            OK
                        </button>
                        <span
                            onClick={handleCancel()}
                            className={"btn btn-primary m-1"}>
                            Batal
                        </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
              </form>
            </div>
        </BlackScreen>
    )
}