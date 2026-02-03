import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AuthProtected({children}){
    const isAdminLoggedIn=useSelector((state)=>state.admin.AdminLoggedIn);
    const isUserLoggedIn=useSelector((state)=>state.auth.isLoggedIn)


    console.log('Admin STATUS=>',{
        isAdminLoggedIn,
        isUserLoggedIn
    });

    if(isAdminLoggedIn){
        return <Navigate to='/admin/home'/>
    }else if(!isUserLoggedIn){
        return <Navigate to='/'/>
    }
    return children
    
}