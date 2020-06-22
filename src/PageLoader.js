import React, { useState } from 'react'


const whiteScreenStyle = {
    "background" : "#fff",
    "display" : "flex",
    "justifyContent" : "center",
    "alignItems" : "center",
    "position" : "fixed",
    "top" : "0px",
    "left" : "0px",
    "width" : "100%",
    "height" : "100%",
}

const loaderStyle = {
    "width" : "300px",
    "height" : "300px",
    "borderRadius" : "300px",
    "border" : "transparent",
    "borderLeft" : "solid 5px #007bff",
    "animationName" : "loaderAnimation",
}

export default function PageLoader(props) {
    const Page = props.page
    function loader() {
        return (
            <div style={whiteScreenStyle}>
                <div className={"loader"}>
                </div>
                <img 
                style={{"position":"fixed","width":"200px","height":"200px","borderRadius":"50%"}} 
                src={"/assets/image/logo-samase.jpg"} />
            </div>
        )    
    }
    return loader()
}