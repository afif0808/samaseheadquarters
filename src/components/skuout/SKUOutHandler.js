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

    return fetch("http://161.35.98.104:555/skuouts",req).then(resp => resp.json())
}

function GetSKUOutsByGroupID(groupId) {
    return fetch("http://161.35.98.104:555/skuoutgroups/" + groupId + "/skuouts").then((resp) => resp.json())
}

export {CreateSKUOuts , GetSKUOutsByGroupID}