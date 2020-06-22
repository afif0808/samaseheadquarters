import React, { useState } from 'react'


export default function SearchBox(props) {
    const [keyword , setKeyword] = useState("")
    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        if(props.handleSubmit) {
            props.handleSubmit({keyword:keyword})
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={"form-inline m-3"}>
                <input className={"form-control"} onChange={handleChange(setKeyword)} type={"search"} placeholder={"Cari..."} />
            </form>
        </div>
    )
}