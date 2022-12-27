import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink, faEye, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tag from "@/pages/Home/components/Tag";
import {useContext, useEffect, useState} from "react";
import LinkContext from "@/common/contexts/Link";
import {deleteRequest} from "@/common/utils/RequestUtil.js";
import ModuleContext from "@/common/contexts/Module";
import {createGravatarUrl} from "@/pages/Home/utils.js";
import "./styles.sass";

export const LinkItem = (props) => {

    const [links, updateLinks] = useContext(LinkContext);
    const modules = useContext(ModuleContext);
    const [icon, setIcon] = useState("link");

    useEffect(() => {
        if (!modules) return;
        setIcon(modules[props.type]["icon"]);
    }, [modules]);

    const clickLink = () => window.open(`http://${props.domain}/${props.accessId}`, '_blank').focus();

    const deleteLink = async () => {
        await deleteRequest(`/link/${props.id}`);
        updateLinks();
    }

    return (
        <div className="link-item">
            <div className="info-area">
                <div className="module-info">
                    <FontAwesomeIcon icon={["fas", icon]}/>
                </div>
                <div className="link-info">
                    <h4>{props.title}</h4>
                    <p>ID: {props.accessId} <FontAwesomeIcon className="link-external" icon={faExternalLink}
                                                             onClick={clickLink}/></p>
                </div>

                <div className="tag-area">
                    {props.tags?.map(tag => <Tag name={tag} key={tag}/>)}
                </div>
            </div>
            <div className="right-area">
                <div className="view-area author-area">
                    <img className="author-image" src={createGravatarUrl(props.creator.email)} alt=""/>
                    <h3>{props.creator.username}</h3>
                </div>

                <div className="view-area">
                    &#124;
                </div>

                <div className="view-area">
                    <FontAwesomeIcon icon={faEye} />
                    <h3>{props.views}</h3>
                </div>

                <div className="action-area">
                    <FontAwesomeIcon className="action-edit" icon={faPencil}/>
                    <FontAwesomeIcon className="action-delete" icon={faTrash} onClick={deleteLink}/>
                </div>
            </div>
        </div>
    );
}