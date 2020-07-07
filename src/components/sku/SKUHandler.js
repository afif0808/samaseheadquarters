async function GetSKUs(name) {
    if(!name) {
        name = ""
    }
    const resp = await fetch("http://localhost:555/skus?name=" + name)
    if (!resp.ok) {
        throw new Error("Request failed")
    }
    return resp.json()
}
async function CreateSKus(postData){
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(postData)
    }
    const resp = await fetch("http://localhost:555/skus", req)
    return await resp.json()

}
async function DeleteSKUById(skuId) {
    const resp = await fetch("http://localhost:555/skus/" + skuId, { method: "DELETE" })
    return await resp.json()
}
async function UpdateSKUById(sku) {     
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({sku : sku}),
    }
    const resp = await fetch("http://localhost:555/skus/" + sku.id, req)
    return await resp.json()
}

async function GetLowStockSKUs() {
    const resp = await fetch("http://localhost:555/skus/lowstocks/")
    return await resp.json()

}
export {GetSKUs , CreateSKus , DeleteSKUById, UpdateSKUById , GetLowStockSKUs} 
