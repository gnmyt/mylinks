import TextBox from "@/common/components/TextBox";
import "./styles.sass";

export const InputGroup = (props) => {
    return (
        <div className="input-group" id={props.id}>
            <div className="text-area">
                <h4>{props.title}</h4>
                <p>{props.description}</p>
            </div>
            <TextBox placeholder={props.title} autoComplete={props.autoComplete}/>
        </div>
    );
}