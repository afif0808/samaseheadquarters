import React from 'react'


export default function BlackScreen(props) {
    const visible = props.visible
    const children = props.children
    
    if(visible) {
        return (
            <div className={"black-screen"} onClick={props.onClick}>
                {children}
            </div>
        )    
    } else {
        return null
    }
}