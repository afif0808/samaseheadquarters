import { Config } from "../Config"

async function GetSKUInGroups() {
    const resp = await fetch(Config.apiSource+"/skuingroups")
    return await resp.json()
}
export {GetSKUInGroups}