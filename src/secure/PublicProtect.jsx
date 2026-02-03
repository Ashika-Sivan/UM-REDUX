import React from 'react'
import {useSelector}from 'react-redux';
import {Navigate}from 'react-router-dom'


export const PublicProtect=({children})=>{
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const isAdminLoggedIn=useSelector((state)=>state.admin.AdminLoggedIn)

     if(isLoggedIn){
        return <Navigate to='/home'/>
    }else if(isAdminLoggedIn){
        return <Navigate to='/admin/home'/>
    }
    return children
}

