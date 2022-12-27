import TextBox from "@/common/components/TextBox";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import Button from "@/common/components/Button";
import {useContext, useRef, useState} from "react";
import {createSession} from "@/common/utils/RequestUtil.js";
import LoginContext from "@/common/contexts/Login";
import "./styles.sass";

export const Login = () => {
    const setToken = useContext(LoginContext);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = (e) => setUsername(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);

    const showError = () => {
        usernameRef.current.classList.add("shake");
        passwordRef.current.classList.add("shake");
    }

    const onLogin = async () => {
        const token = await createSession(username, password);
        if (token === null) return showError();

        setToken(token);
    }

    return (
        <div className="login-container">
            <form className="login-wrapper" onSubmit={(e) => e.preventDefault()}>
                <h2 className="title">My<span>Links</span></h2>
                <TextBox icon={faUser} placeholder="Benutzername" value={username} onUpdate={updateUsername} autoComplete="username" useRef={usernameRef}/>
                <TextBox icon={faKey} placeholder="Passwort" value={password} onUpdate={updatePassword} type="password" autoComplete="current-password" useRef={passwordRef}/>
                <Button text="Anmelden" onClick={onLogin}/>
            </form>
        </div>
    )
}