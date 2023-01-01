import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import DialogContext from "@/common/contexts/Dialog";
import "./styles.sass";

export const DialogHeader = (props) => {
    const close = useContext(DialogContext);

    return (
        <div className="dialog-header">
            <div className="info-area">
                <div className="module-info">
                    <FontAwesomeIcon className="info-icon" icon={["fas", props.icon]}/>
                </div>
                <div className="text-area">
                    <h2>{props.editMode ? "Link bearbeiten" : "Neuer Link"}</h2>
                    <p>{props.module}</p>
                </div>
            </div>
            <FontAwesomeIcon className="close-icon" icon={faClose} onClick={close}/>
        </div>
    )
}
