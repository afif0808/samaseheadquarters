function UpdateStockById(stock) {
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({stock:stock}),
    }
    return fetch("http://161.35.98.104:555/stocks/" + stock.id , req).then((resp)=>resp.json())
}

export {UpdateStockById}