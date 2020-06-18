function GetSKUs() {
    return fetch("http://161.35.98.104:555/skus").then((resp) => resp.json())
}
function CreateSKus(postData){
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(postData)
    }
    return fetch("http://161.35.98.104:555/skus",req).then(resp => resp.json())

}
function DeleteSKUById(skuId) {
    return fetch("http://161.35.98.104:555/skus/" + skuId , {method:"DELETE"}).then(resp => resp.json())
}
function UpdateSKUById(sku) {     
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({sku : sku}),
    }
    return fetch("http://161.35.98.104:555/skus/" + sku.id,req).then(resp => resp.json())
}
export {GetSKUs , CreateSKus , DeleteSKUById, UpdateSKUById} 
