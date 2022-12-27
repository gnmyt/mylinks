import React, {createContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";

export const ModuleContext = createContext({});

export const ModuleProvider = (props) => {
    const [modules, setModules] = useState();

    const updateModules = () => jsonRequest(`/module/list`).then(json => setModules(json));

    useEffect(() => {updateModules()}, []);

    return (
        <ModuleContext.Provider value={modules}>
            {props.children}
        </ModuleContext.Provider>
    )
}