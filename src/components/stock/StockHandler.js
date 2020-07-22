import { Config } from "../../Config"

async function UpdateStockBySKUId(stock) {
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({stock:stock}),
    }
    const resp = await fetch(Config.apiSource + "/stocks/" + stock.sku_id, req)
    return await resp.json()
}

export {UpdateStockBySKUId}