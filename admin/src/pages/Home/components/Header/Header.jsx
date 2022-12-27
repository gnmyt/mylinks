import {useContext, useEffect, useState} from "react";
import UserContext from "@/common/contexts/User";
import LoginContext from "@/common/contexts/Login";
import {createGravatarUrl} from "@/pages/Home/utils.js";
import "./styles.sass";

export const Header = () => {

    const user = useContext(UserContext);
    const setToken = useContext(LoginContext);
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        if (!user) return;
        setProfileImage(createGravatarUrl(user.email));
    }, [user]);

    return (
        <header>
            <h2 className="header-title">My<span>Links</span></h2>
            <img className="header-profile" src={profileImage} alt="" onClick={() => setToken(null)}/>
        </header>
    )
}