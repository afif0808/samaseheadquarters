import { Config } from "../../Config"

function UpdateStockById(stock) {
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({stock:stock}),
    }
    return fetch(Config.apiSource+"/stocks/" + stock.id , req).then((resp)=>resp.json())
}

export {UpdateStockById}