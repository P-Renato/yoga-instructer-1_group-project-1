import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
export default function Adminpage() {
    return (
        <div className='adminpage'>
            <SideBar />
            <div className='information'>
            <Outlet />
            </div>
        </div>
    )
}
