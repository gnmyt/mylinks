import React, {createContext, useContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";
import {DomainContext} from "@/common/contexts/Domain/DomainContext.jsx";

export const LinkContext = createContext({});

export const LinkProvider = (props) => {

    const [currentDomain] = useContext(DomainContext);
    const [links, setLinks] = useState([]);
    const [query, setQuery] = useState({});
    const [searchContainer, setSearchContainer] = useState("");

    const generateQuery = () => {
        const finalJson = {};

        if (query.tag) finalJson.tags = query.tag;
        if (query.creator) finalJson.creator = query.creator;
        if (query.title) finalJson.title = query.title;

        return new URLSearchParams(finalJson).toString();
    }

    const updateLinks = () => jsonRequest(`/link/${currentDomain}/list?${generateQuery()}`).then(json => {
        if (!json.message) setLinks(json);
    });

    useEffect(() => {
        updateLinks();

        const interval = setInterval(() => updateLinks(), 15000);
        return () => clearInterval(interval);
    }, [currentDomain, query]);

    return (
        <LinkContext.Provider value={[links, updateLinks, setQuery, query, searchContainer, setSearchContainer]}>
            {props.children}
        </LinkContext.Provider>
    )
}