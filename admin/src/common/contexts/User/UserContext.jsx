import React, {createContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const [user, setUser] = useState();

    const updateUser = () => jsonRequest(`/user/me`).then(json => setUser(json));

    useEffect(() => {updateUser()}, []);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}