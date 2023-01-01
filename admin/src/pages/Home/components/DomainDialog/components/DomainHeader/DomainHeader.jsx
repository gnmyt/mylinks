import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import DialogContext from "@/common/contexts/Dialog";
import {useContext} from "react";
import "./styles.sass";

export const DomainHeader = (props) => {
    const close = useContext(DialogContext);

    return (
        <div className="domain-header">
            <h2>{props.title || "Domainauswahl"}</h2>
            <div className="close-button">
                <FontAwesomeIcon icon={faClose} onClick={close} />
            </div>
        </div>
    )
}