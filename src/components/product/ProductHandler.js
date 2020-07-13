import { Config } from "../../Config"

function UpdateProductById(product) {
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({product:product}),
    }
    return fetch(Config.apiSource+"/products/" + product.id , req).then((resp)=>resp.json())
}
export {UpdateProductById}