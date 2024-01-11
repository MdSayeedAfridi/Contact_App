import React from 'react'
import { Routes, Route } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Home from "./Home"
import Contacts from "./Contacts"
import "../App.css"

const Layout = () => {
    return (
        <div className='fullPage'>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/contacts" element={<Contacts />} />
            </Routes>
        </div>
    )
}

export default Layout;
