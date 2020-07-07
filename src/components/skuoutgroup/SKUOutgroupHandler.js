function GetSKUOutgroups() {
   return fetch("http://localhost:555/skuoutgroups").then((resp) => resp.json()) 
}
function DeleteSKUOutGroup(skuOutgroup) {
   return fetch("http://localhost:555/skuoutgroups/" + skuOutgroup.id,{method:"DELETE"}).then(resp => resp.json())
}
export {GetSKUOutgroups , DeleteSKUOutGroup}