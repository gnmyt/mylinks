import React, {createContext, useEffect, useState} from "react";
import {jsonRequest} from "@/common/utils/RequestUtil";

export const DomainContext = createContext({});

export const DomainProvider = (props) => {

    const [currentDomain, setCurrentDomain] = useState(localStorage.getItem("domain") || window.location.host);
    const [domains, setDomains] = useState([]);

    const updateDomains = () => jsonRequest(`/domains`)
        .then(json => setDomains(json));

    const updateCurrentDomain = (domain) => {
        setCurrentDomain(domain);
        localStorage.setItem("domain", domain);
    }

    useEffect(() => {
        updateDomains();
    }, []);

    useEffect(() => {
        if (domains.length === 0) return;
        if (!domains.includes(currentDomain))
            updateCurrentDomain(domains.length !== 0 ? domains[0] : window.location.host);
    }, [domains]);

    return (
        <DomainContext.Provider value={[currentDomain, updateCurrentDomain, domains, updateDomains]}>
            {props.children}
        </DomainContext.Provider>
    )
}