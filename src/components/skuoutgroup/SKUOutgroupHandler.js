function GetSKUOutgroups() {
   return fetch("http://localhost:555/skuoutgroups").then((resp) => resp.json()) 
}

export {GetSKUOutgroups}