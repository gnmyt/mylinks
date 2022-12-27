import "./styles.sass";

export const Button = (props) => (
    <button className="btn" {...props}>{props.text}</button>
);