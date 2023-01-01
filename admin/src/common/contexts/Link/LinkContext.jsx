import React, {createContext, useContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";
import {DomainContext} from "@/common/contexts/Domain/DomainContext.jsx";

export const LinkContext = createContext({});

export const LinkProvider = (props) => {

    const [currentDomain] = useContext(DomainContext);
    const [links, setLinks] = useState([]);
    const [query, setQuery] = useState(""); // TODO

    const updateLinks = () => jsonRequest(`/link/${currentDomain}/list`)
        .then(json => setLinks(json));

    useEffect(() => {
        updateLinks();

        const interval = setInterval(() => updateLinks(), 15000);
        return () => clearInterval(interval);
    }, [currentDomain]);

    return (
        <LinkContext.Provider value={[links, updateLinks, setQuery]}>
            {props.children}
        </LinkContext.Provider>
    )
}