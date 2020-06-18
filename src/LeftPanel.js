import React from 'react'


import { Link,BrowserRouter as Router } from 'react-router-dom'

export default function LeftPanel(props) {
    function menuItem(){
        return [
            {value : "Beranda",href:"/home"},
            {value : "Aksesoris",href:"/accessories/list"},
            {value : "Aksesoris Keluar",href:"/accessoryoutgroups/list"},
        ]
    }
    function menuItemList() {
        var list  = menuItem().map((item) =>
            <li className="nav-item">
                <Link className="nav-link" to={item.href}>{item.value}</Link>
            </li>
        )
        return list
    }
    return (
        <div>
            <ul className="nav flex-sm-column ">
                {menuItemList()}
            </ul>            
        </div>
    )
}

