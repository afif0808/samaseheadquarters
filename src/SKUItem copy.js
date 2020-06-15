import React,{useState, useEffect} from 'react'
export default function SKUItem(props) {
    var sku = props.sku
    var skuSetter = props.skuSetter
    var skuRemover = props.skuRemover
    const [marked,setMarked] = useState(sku.marked)
    
    function handleClick() {
        setMarked(!marked)       
    }

    
    
    const [className,setClassName] = useState("sku-item")
    useEffect(()=>{
        if(marked) {
            setClassName("sku-item marked")
            skuSetter(sku)
        } else {
            setClassName("sku-item")
            skuRemover(sku)
        } 
    })
    return (
        <tr key={sku.id} className={className} onClick={handleClick}>
            <td>{sku.product.name}</td>
            <td>{sku.code}</td>
            <td>{sku.stock.qty}</td>
        </tr>
    )
}
