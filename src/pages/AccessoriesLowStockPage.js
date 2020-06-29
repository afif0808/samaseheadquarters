import React, { useEffect ,useState } from 'react'
import { GetLowStockSKUs } from '../components/sku/SKUHandler'
import SKUList from '../components/sku/SKUList'
import SKUItem from '../components/sku/SKUItem'

export default function AccessoriesLowStockPage(props) {
    const [skus , setSKUs] = useState(null)
    useEffect(()=>{
        if(skus == null) {
            GetLowStockSKUs().then((resp)=>{
                setSKUs(resp)
            })
        }
    },[skus])    
    function skuItems(skus) {
        if(skus != null && skus.length > 0)
        return skus.map((sku)=>{
            return <SKUItem sku={sku}></SKUItem>
        })
    }
    
    function skuListHead() {
        return (
          <tr>
            <td>Nama</td>
            <td>Kode</td>
            <td>Jumlah</td>
          </tr>
        )
    }
  
    return (
        <div>
            <h3 className={"m-3"}>Pengingat Stok</h3>
            
            <SKUList
                className={"table"}
                headRows={skuListHead()}>
                {skuItems(skus)}
            </SKUList>
        </div>
    )
}