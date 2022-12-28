import React, {createContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";

export const LinkContext = createContext({});

export const LinkProvider = (props) => {

    const [domain, setDomain] = useState(localStorage.getItem("domain") || "localhost"); // TODO
    const [links, setLinks] = useState([]);
    const [query, setQuery] = useState(""); // TODO

    const updateLinks = () => jsonRequest(`/link/${domain}/list`)
        .then(json => setLinks(json));

    useEffect(() => {
        updateLinks();
        const interval = setInterval(() => updateLinks(), 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <LinkContext.Provider value={[links, updateLinks, setQuery, setDomain]}>
            {props.children}
        </LinkContext.Provider>
    )
}