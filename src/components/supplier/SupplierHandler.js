import { Config } from "../../Config"

async function GetSuppliers() {
    
    const resp = await fetch(Config.apiSource+"/suppliers")
    return await resp.json()
}
async function CreateSupplier(supplier) {
    const post = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({supplier : supplier})
    }
    const resp = await fetch(Config.apiSource+"/suppliers",post)
    return await resp.json()
}
export {GetSuppliers,CreateSupplier}