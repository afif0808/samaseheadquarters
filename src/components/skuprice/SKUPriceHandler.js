async function UpdateSKUPrice(skuPrice) {
    const req = {
        method :"POST",
        body : JSON.stringify({sku_price : skuPrice}),
        headers : {
            "Content-Type" : "application/json",
        }
    }
    const resp = await fetch("http://localhost:555/skuprices/"+skuPrice.sku_id,req)  
    return await resp.json() 
}
export {UpdateSKUPrice}