import React , {useState,useEffect} from 'react'
import SKUItem from './SKUItem'
import QtyFormModal from './QtyFormModal'

export default function SKUList(props) {
    // States
    const [qtyFormModalVisibility , setQtyFormModalVisibility] = useState(false)
    const [sku , setSKU] = useState(null)
    const [skuOuts , setSKUOuts] = useState({})
    const [skuItemClassNames , setSKUItemClassNames] = useState({})

    // Variables
    var skus = props.skus
    var sicn = skuItemClassNames
    for (const sku of skus) {
        if(sku.marked) {
            sicn[sku] = "sku-item marked"
        } else {
            sicn[sku] = "sku-item"
        }
    }
    setSKUItemClassNames(sicn)

    // 
    function showQtyFormModal() {
        setQtyFormModalVisibility(true)
    }

    function isSKUItemMarked(id) {
        return skuOuts[id] != null
    }
    // Effects 

    useEffect(()=>{
    },[skuOuts])

    // Handlers 
    function skuItemHandleClick(sku) {
        setSKU(sku)
        showQtyFormModal()
    }

    function handleQtyFormModalOK(data) {
        setQtyFormModalVisibility(false)
        var skuOut = {qty : data.qty, sku_id : sku.id}
        var skuouts = skuOuts
        skuouts[skuOut.sku_id] = skuOut  
        setSKUOuts(skuouts)
    }

    

    var list = skus.map((sku) => {
        return <SKUItem key={sku.id} className={skuItemClassNames[sku.id]} handleClick={skuItemHandleClick.bind(this)} sku={sku}/>
    })

    return (
        <div>
            <QtyFormModal  handleOK={handleQtyFormModalOK} show={qtyFormModalVisibility} title={"How much?"} />
            <table>
                <tbody>
                    {list}                   
                </tbody>
            </table>
        </div>
    )

}