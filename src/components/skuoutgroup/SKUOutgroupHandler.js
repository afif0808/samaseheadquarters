function GetSKUOutgroups() {
   return fetch("http://161.35.98.104:555/skuoutgroups").then((resp) => resp.json()) 
}

export {GetSKUOutgroups}