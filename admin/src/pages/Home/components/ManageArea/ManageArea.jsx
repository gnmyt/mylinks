import TextBox from "@/common/components/TextBox";
import Button from "@/common/components/Button";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import LinkChooser from "@/pages/Home/components/LinkChooser";
import DomainButton from "@/pages/Home/components/ManageArea/components/DomainButton";
import LinkContext from "@/common/contexts/Link/index.js";
import "./styles.sass";

export const ManageArea = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [links, updateLinks, setQuery, query, search, setSearch] = useContext(LinkContext);

    const generateQuery = () => {
        const result = {};
        const keyValueRegex = /([^\s:]+):"([^"]+)"|([^\s:]+):(\S+)/g;
        let title = '';
        let currentIndex = 0;
        let match;
        while (match = keyValueRegex.exec(search)) {
            const key = match[2] ? match[1] : match[3];
            const value = match[2] ? match[2] : match[4];
            result[key] = result[key] ? `${result[key]}, ${value}` : value;
            title += search.slice(currentIndex, match.index).trim();
            currentIndex = keyValueRegex.lastIndex;
        }
        title += search.slice(currentIndex).trim();
        result.title = title;
        return result;
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => setQuery(generateQuery()), 300);
        return () => clearTimeout(timeOutId);
    }, [search]);

    return (
        <div className="manage-area">
            <LinkChooser isOpen={showDialog} close={() => setShowDialog(false)}/>
            <TextBox icon={faSearch} placeholder="Link suchen" value={search} onUpdate={e => setSearch(e.target.value)} id="search"/>
            <DomainButton />
            <Button text="Link erstellen" onClick={() => setShowDialog(true)} />
        </div>
    )
}
