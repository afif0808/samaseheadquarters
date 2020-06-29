import React from 'react'
import BlackScreen from './BlackScreen'


export default function ConfirmationModal(props) {
    function handleOKClick() {
        if(props.handleOKClick != null) {
            props.handleOKClick()
        }
    }
    function handleCancelClick() {
        if(props.handleCancelClick != null) {
            props.handleCancelClick()
        } 
    }
    if(props.visible) {
        return (
            <BlackScreen visible={props.visible}>
                <table className={"col-lg-4 col-sm-8 table bg-white"}>
                    <tbody>
                        <tr>
                            <td>
                                <h6>{props.text}</h6>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <span 
                            onClick={handleOKClick} 
                            className={"btn btn-outline-primary font-weight-bold m-1"}>OK</span>
                            
                            <span 
                            onClick={handleCancelClick} 
                            className={"btn btn-primary font-weight-bold m-1"}>Batal</span>    

                            </td>                            
                        </tr>
                    </tbody>
                </table>
            </BlackScreen>
        )
    } else {
        return null
    }
}