import React from 'react'


import { Link,BrowserRouter as Router } from 'react-router-dom'

export default function LeftPanel(props) {
    function menuItem(){
        return [
            {value : "Beranda",href:"/home"},
            {value : "Aksesoris",href:"/accessories/list"},
            {value : "Aksesoris Keluar",href:"/accessoryoutgroups/list"},
            {value : "Aksesoris Masuk",href:"/accessoryingroups/list"},
            {value : "Pengingat Stok",href:"/accessories/stockalert"},
            {value : "Vendor",href:"/vendors/list"},
            {value : "Suplier",href:"/suppliers/list"},
        ]
    }
    function menuItemList() {
        var list  = menuItem().map((item) =>
            <li className="nav-item">
                <Link className="nav-link text-primary font-weight-bold " to={item.href}>{item.value}</Link>
            </li>
        )
        return list
    }
    return (
        <div className={""} >
            <ul className="nav flex-sm-column ">
                {menuItemList()}
            </ul>            
        </div>
    )
}

