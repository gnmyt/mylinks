import Header from "@/pages/Home/components/Header";
import ManageArea from "@/pages/Home/components/ManageArea";
import LinkContext from "@/common/contexts/Link";
import {useContext} from "react";
import LinkItem from "@/pages/Home/components/LinkItem";
import "./styles.sass";

export const Home = () => {
    const [links] = useContext(LinkContext);
    return (
        <div className="home-wrapper">
            <Header/>
            <ManageArea/>

            <div className="link-area">
                {links.map(link => <LinkItem id={link.id} title={link.title} accessId={link.accessId} tags={link.tags}
                                             domain={link.domainName} key={link.id} type={link.type}
                                             views={link.clicks} creator={link.creator}/>)}
                {links.length === 0 &&
                    <h2 className="text-center">Bisher wurden keine Links unter dieser Domain erstellt</h2>}
            </div>
        </div>
    )
}