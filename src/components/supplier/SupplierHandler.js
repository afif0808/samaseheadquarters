async function GetSuppliers() {
    const resp = await fetch("http://localhost:555/suppliers")
    return await resp.json()
}
export {GetSuppliers}