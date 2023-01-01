import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useContext, useRef} from "react";
import DialogContext from "@/common/contexts/Dialog";
import DomainContext from "@/common/contexts/Domain";
import {deleteRequest} from "@/common/utils/RequestUtil.js";
import "./styles.sass";

export const DomainItem = (props) => {
    const close = useContext(DialogContext);
    const [currentDomain, updateCurrentDomain, domains, updateDomains] = useContext(DomainContext);
    const deleteRef = useRef();

    const onClick = (event) => {
        if (deleteRef.current?.contains(event.target)) return;
        close();
        props.onClick();
    }

    const deleteDomain = async () => {
        const request = await deleteRequest(`/domains/${props.domainName}`);
        if (!request.ok) return close();
        updateDomains();
    }

    return (
        <div className={"domain-item " + (props.domainName === currentDomain ? "domain-current" : "")} onClick={onClick}>
            <FontAwesomeIcon icon={faGlobe}/>
            <p>{props.domainName}</p>
            <FontAwesomeIcon icon={faTrash} onClick={deleteDomain} ref={deleteRef} className="delete-domain"/>
        </div>
    )
}