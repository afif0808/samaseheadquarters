function UpdateProductById(product) {
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({product:product}),
    }
    return fetch("http://161.35.98.104:555/products/" + product.id , req).then((resp)=>resp.json())
}
export {UpdateProductById}