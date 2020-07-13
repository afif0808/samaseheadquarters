import { Config } from "../../Config"

function GetSKUOutgroups() {
   return fetch(Config.apiSource+"/skuoutgroups").then((resp) => resp.json()) 
}
function DeleteSKUOutGroup(skuOutgroup) {
   return fetch(Config.apiSource+"/skuoutgroups/" + skuOutgroup.id,{method:"DELETE"}).then(resp => resp.json())
}
export {GetSKUOutgroups , DeleteSKUOutGroup}