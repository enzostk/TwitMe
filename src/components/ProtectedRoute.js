import React from 'react';
import Cookies from 'js-cookie';
import Login from './Login';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loggedAtom } from '../atoms/user';



function ProtectedRoute() {

    console.log(Cookies.get('token'));
    const isLogged = useAtomValue(loggedAtom)

    const navigate = useNavigate()

    return (
         isLogged ? <Outlet /> : <Navigate to ="/login" />
    );
}

export default ProtectedRoute;