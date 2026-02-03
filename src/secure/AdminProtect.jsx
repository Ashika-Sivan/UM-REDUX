import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminProtect({children}) {
 const isAdminLoggedIn=useSelector((state)=>state.admin.AdminLoggedIn);
const isUserLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
 

if(isUserLoggedIn){
    return <Navigate to='/home'/>
}else if(!isAdminLoggedIn){
    return <Navigate to='/admin/login'/>
}

return children

}
