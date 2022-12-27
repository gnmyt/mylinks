import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";

export const Tag = (props) => (
    <div className="tag">
        <FontAwesomeIcon icon={faTag} />
        <h3>{props.name}</h3>
    </div>
)