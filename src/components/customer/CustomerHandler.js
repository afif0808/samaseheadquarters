import {Config} from "../../Config"

async function GetCustomers() {
    const resp = await fetch(Config.apiSource+"/customers")
    return await resp.json()   
}

async function CreateCustomer(customer) {
    var post = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({customer : customer})
    }
    const resp = await fetch("http://localhost:555/customers", post)
    return await resp.json()
}

export {GetCustomers , CreateCustomer}

