import { Config } from "../../Config"

async function GetSKUs(name) {
    if(!name) {
        name = ""
    }
    const resp = await fetch(Config.apiSource+"/skus?name=" + name)
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
    const resp = await fetch(Config.apiSource+"/skus", req)
    return await resp.json()

}
async function DeleteSKUById(skuId) {
    const resp = await fetch(Config.apiSource+"/skus/" + skuId, { method: "DELETE" })
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
    const resp = await fetch(Config.apiSource+"/skus/" + sku.id, req)
    return await resp.json()
}

async function GetLowStockSKUs() {
    const resp = await fetch(Config.apiSource+"/skus/lowstocks/")
    return await resp.json()

}
export {GetSKUs , CreateSKus , DeleteSKUById, UpdateSKUById , GetLowStockSKUs} 
