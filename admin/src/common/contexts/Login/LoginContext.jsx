import React, {createContext, useEffect, useState} from "react";
import {request} from "@/common/utils/RequestUtil";
import Login from "@/pages/Login";

export const LoginContext = createContext({});

export const LoginProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [renderPage, setRenderPage] = useState(0);

    const checkLogin = () => {
        request("/info/status").then(res => {
            if (res.status === 401 || res.status === 400) throw 1;
            if (!res.ok) throw 2;
        }).then(() => setRenderPage(1)).catch((e) => {
            if (e === 2) return;
            setRenderPage(2);
            setToken(null);
        });
    }

    const tokenUpdate = () => {
        if (token === null) {
            localStorage.removeItem("token");
            setRenderPage(2);
            return;
        }
        localStorage.setItem("token", token);
        checkLogin();
    }

    useEffect(tokenUpdate, [token]);

    return (
        <LoginContext.Provider value={setToken}>
            {renderPage === 2 && <Login/>}
            {renderPage === 1 && props.children}
        </LoginContext.Provider>
    )
}