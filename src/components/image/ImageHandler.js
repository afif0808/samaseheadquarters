import { Config } from "../../Config"

async function UploadImage(imagefile) {
    const formData = new FormData()
    formData.append("image",imagefile)
    const req = {
        method : "POST",
        body : formData,
    }
    const resp  = await fetch(Config.apiSource+"/skuimages/upload",req)
    return await resp.json()
}

export {UploadImage}