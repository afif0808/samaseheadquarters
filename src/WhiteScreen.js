import React from 'react'


export default function WhiteScreen(props) {
    const style = {
        "background" : "#fff",
        "display" : "flex",
        "height" : "100%",
        "width" : "100%",
        "top" : "0",
        "left" : "0",
        "position" : "fixed",
        "justifyContent" : "center",
        "alignItems" : "center",
    }
    if(props.visible) {
        return (
            <div style={style}>
                {props.children}
            </div>
        )            
    } else {
        return null
    }
}