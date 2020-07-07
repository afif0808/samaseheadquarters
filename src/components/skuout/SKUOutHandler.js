function CreateSKUOuts(skuOuts,skuOutGroup) {
    var postData = {
        sku_outs : skuOuts , 
        sku_out_group : skuOutGroup,
    }
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(postData)
    }
    
    console.log(req)
    return fetch("http://localhost:555/skuouts",req).then(resp => resp.json())
}

function GetSKUOutsByGroupID(groupId) {
    return fetch("http://localhost:555/skuoutgroups/" + groupId + "/skuouts").then((resp) => resp.json())
}

function DeleteSKUOutByID(id) {
    return fetch("http://localhost:555/skuouts/" + id,{method:"DELETE"}).then(resp => resp.json())
}

function UpdateSKUOutByID(skuOut) {
    var req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({sku_out:skuOut}),
    }
    return fetch("http://localhost:555/skuouts/" + skuOut.id,req).then(resp => resp.json())
}
export {CreateSKUOuts , GetSKUOutsByGroupID , DeleteSKUOutByID, UpdateSKUOutByID}