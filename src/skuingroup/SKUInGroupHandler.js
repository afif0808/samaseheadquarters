async function GetSKUInGroups() {
    const resp = await fetch("http://localhost:555/skuingroups")
    return await resp.json()
}
export {GetSKUInGroups}