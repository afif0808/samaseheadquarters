const { Config } = require("../../Config")

async function CreateSKUImage(skuImages) {
    const req = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({sku_images : skuImages})
    }
    const resp = await fetch(Config.apiSource+"/skuimages",req)
    return await resp.json()
}

async function DeleteSKUImageByID(id) {
    const resp = await fetch(Config.apiSource+"/skuimages/"+id,{method:"DELETE"})
    return await resp.json()
}

export {CreateSKUImage,DeleteSKUImageByID}