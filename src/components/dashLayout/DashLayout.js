import React from 'react'
import { Outlet } from 'react-router-dom'
import DashFooter from '../dashFooter/DashFooter'
import DashHeader from '../dashHeader/DashHeader'

const DashLayout = () => {
  return (
    <>
    <DashHeader/>
    <div className='dash-container'>
        <Outlet/>
    </div>
    <DashFooter/>
    </>
  )
}

export default DashLayout