import React from 'react'
import { Config } from '../../Config'
async function CreateSKUIns(skuIns , skuInGroup) {
    const post = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({sku_ins : skuIns,sku_in_group :skuInGroup}),
    }
    console.log(skuIns,skuInGroup)
    const resp = await fetch(Config.apiSource+"/skuins",post)
    return await resp.json()
}
async function GetSKUInsByGroupID(groupID) {
    alert(Config.apiSource+"/skuingroups/" + groupID +  "/skuins")
    const resp = await fetch(Config.apiSource+"/skuingroups/" + groupID +  "/skuins")
    if(resp.ok == false) {
        throw Error("")
    }
    return resp.json()
}

async function DeleteSKUInByID(id) {
    const resp = await fetch(Config.apiSource+"/skuins/" + id, { method: "DELETE" })
    return await resp.json()
}

async function UpdateSKUInByID(id,skuIn) {
    const post = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({sku_in : skuIn})
    }
    const resp = await fetch(Config.apiSource+"/skuins/" + id, post)
    return await resp.json()
}

export {CreateSKUIns , GetSKUInsByGroupID ,DeleteSKUInByID , UpdateSKUInByID}