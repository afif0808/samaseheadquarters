import React from 'react'
import { Link,BrowserRouter as Router } from 'react-router-dom'
export default function AccessoryOutsListPage() {
    return (
        <div>
            <h3 className="p-3">Aksesoris Keluar</h3>
            <Link  to={"/accessoryouts/add"} className="btn btn-primary">Tambah</Link>
        </div>
    )
}