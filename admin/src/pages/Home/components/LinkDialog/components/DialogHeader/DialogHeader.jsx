import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

export const DialogHeader = (props) => (
    <div className="dialog-header">
        <div className="info-area">
            <div className="module-info">
                <FontAwesomeIcon className="info-icon" icon={["fas", props.icon]}/>
            </div>
            <div className="text-area">
                <h2>Neuer Link</h2>
                <p>{props.module}</p>
            </div>
        </div>
        <FontAwesomeIcon className="close-icon" icon={faClose} onClick={props.close}/>
    </div>
)