import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.sass";

export const TextBox = (props) => {
    const handleAnimation = () => props.useRef ? props.useRef.current.classList.value = "textbox-wrapper" : "";

    return (
        <div className="textbox-wrapper" ref={props.useRef} onAnimationEnd={handleAnimation}>
            <input className="textbox-input" placeholder={props.placeholder} value={props.value}
                   onChange={props.onUpdate} type={props.type || "text"} autoComplete={props.autoComplete}
                   data-form-type={props.autoComplete === "off" ? "other" : ""} defaultValue={props.default}/>
            {props.icon && <FontAwesomeIcon icon={props.icon} className="textbox-icon"/>}
        </div>
    );
}