function GetCustomers() {
    return fetch("http://localhost:555/customers").then(resp => resp.json())   
}

export {GetCustomers}