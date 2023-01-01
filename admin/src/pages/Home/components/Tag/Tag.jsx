import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import LinkContext from "@/common/contexts/Link/index.js";
import "./styles.sass";

export const Tag = (props) => {
    const [links, updateLinks, setQuery, query, search, setSearch] = useContext(LinkContext);

    const addQuery = () => {
        if (!query.tag?.split(",").includes(props.name))
            setSearch(`tag:"${props.name}" ${search}`);
    }

    return (
        <div className="tag" onClick={addQuery}>
            <FontAwesomeIcon icon={faTag}/>
            <h3>{props.name}</h3>
        </div>
    )
}
