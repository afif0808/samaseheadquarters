function GetCustomers() {
    return fetch("http://161.35.98.104:555/customers").then(resp => resp.json())   
}

export {GetCustomers}