import React, {FC} from "react";
import {Route, Navigate} from "react-router-dom";

interface IGuestRoute{
    path: string
    children: React.ReactNode
}

const GuestRoute: FC<IGuestRoute> = ({path, children}) => {
    const isAuth = localStorage.getItem('user');

    return isAuth
        ? <Navigate to="/" />
        : <Route path={path} element={children} />;
}

export default GuestRoute;
