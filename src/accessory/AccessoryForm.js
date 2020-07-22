import React, { useState, useEffect } from 'react'

export default function AccessoryForm(props) {
    var className = (props.className != null) ? props.className : ""
    const [name , setName ] = useState(props.name)
    const [code , setCode] = useState(props.code)
    const [qty , setQty] = useState(props.qty)
    const [minimumQty , setMinimumQty] = useState(props.minimumQty)
    const [buyingPrice , setBuyingPrice] = useState(props.buyingPrice)
    const [sellingPrice , setSellingPrice] = useState(props.sellingPrice)

    const[data , setData ] = useState({})
    const visible = (props.visible == null) ? true : props.visible
    useEffect(()=>{
        data.name = name
        data.qty = qty
        data.code = code
        data.minimumQty = minimumQty
        data.buyingPrice = buyingPrice
        data.sellingPrice = sellingPrice
        if(props.handleFormChange) {
            props.handleFormChange(data)
        }

    })

    function handleChange(setter) {
        return (e) => {
            setter(e.target.value)
        }
    }
    if(visible) {
        return (
            <table className={className} >
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>
                            <input 
                            onChange={handleChange(setName)} 
                            type={"text"} 
                            required={true}
                            value={name}
                            className={"form-control"}  />
                        </td>
                    </tr>
                    <tr>
                        <td>Kode</td>
                        <td>
                            <input 
                                onChange={handleChange(setCode)} 
                                type={"text"} 
                                required={true}
                                value={code}
                                className={"form-control"}  />
                        </td>
                    </tr>
                    <tr>
                        <td>Jumlah</td>
                        <td>
                            <input 
                                onChange={handleChange(setQty)} 
                                type={"number"} 
                                value={qty}
                                required={true}
                                className={"form-control"}  />
                        </td>
                    </tr>
                    <tr>
                        <td>Jumlah Minimum</td>
                        <td>
                        <input 
                            onChange={handleChange(setMinimumQty)} 
                            type={"number"} 
                            required={true}
                            value={minimumQty}
                            className={"form-control"}  />
                        </td>
                    </tr>
                    <tr>
                        <td>Harga Beli</td>
                        <td>
                            <input
                             className={"form-control"}
                             onChange={handleChange(setBuyingPrice)}
                             value={buyingPrice}
                             required={true}
                             type={"number"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Harga Jual</td>
                        <td>
                            <input
                             className={"form-control"}
                             onChange={handleChange(setSellingPrice)}
                             value={sellingPrice}
                             required={true}
                             type={"number"}/>
                        </td>
                    </tr>

                    {props.children}
                </tbody>
            </table>
        )            
    } else {
        return null
    }
}
