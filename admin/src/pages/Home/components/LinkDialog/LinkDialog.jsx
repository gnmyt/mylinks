import {useContext, useEffect, useRef, useState} from "react";
import Button from "@/common/components/Button";
import DialogHeader from "@/pages/Home/components/LinkDialog/components/DialogHeader";
import InputGroup from "@/pages/Home/components/LinkDialog/components/InputGroup";
import ModuleContext from "@/common/contexts/Module";
import {putRequest} from "@/common/utils/RequestUtil.js";
import LinkContext from "@/common/contexts/Link";
import "./styles.sass";

export const LinkDialog = (props) => {
    const ref = useRef();
    const groups = useRef();
    const [links, updateLinks] = useContext(LinkContext);
    const [error, setError] = useState("");
    const modules = useContext(ModuleContext);
    const [module, setModule] = useState();

    useEffect(() => {
        if (!modules) return;
        setModule(modules[props.module]);
    }, [modules]);

    const close = () => ref.current?.classList.add("dialog-hidden");

    const onClose = (e) => {
        setError("");
        if (e.animationName === "fadeOut") props?.close();
    }

    const getBody = () => {
        const body = {meta: {}, type: props.module, domainName: "localhost"}; //TODO
        let isMeta = false;
        groups.current.childNodes.forEach((groupNode) => {
            // check if array
            groupNode.childNodes.forEach(node => {
                if (node.localName === "h2") return;
                let value = node.childNodes[1].childNodes[0].value || undefined;
                value = node.id === "tags" ? value?.split(",") : value;

                isMeta ? body["meta"][node.id] = value : body[node.id] = value;
            });
            isMeta = true;
        });

        return body;
    }

    const submit = async () => {
        const response = (await putRequest("/link", getBody()));
        if (response.status === 200) {
            updateLinks();
            close();
            return;
        }
        setError((await response.json()).message);
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (!ref.current?.contains(event.target)) close();
        }

        document.addEventListener("mousedown", handleClick);
    }, [ref]);

    if (!props.isOpen) return <></>;

    return (
        <div className="dialog-area">
            <div className="dialog" ref={ref} onAnimationEnd={onClose}>
                <DialogHeader close={close} module={module.name} icon={module.icon}/>

                <div className="dialog-main" ref={groups}>
                    <div className="dialog-group">
                        <h2>Allgemein</h2>
                        <InputGroup title="Neuer Link" description="Wähle deinen neuen Link" id="accessId" autoComplete="off"/>
                        <InputGroup title="Titel" description="Worum geht es hier?" id="title" autoComplete="off"/>
                        <InputGroup title="Tags" description="Trenne Tags mit einem Komma" id="tags" autoComplete="off"/>
                    </div>

                    {module.meta.map(group => <div className="dialog-group" key={group.name} id={group.name}>
                        <h2>{group.name}</h2>

                        {Object.entries(group.fields).map(([id, obj]) => <InputGroup title={obj.name}
                                                                                     description={obj.description}
                                                                                     key={id} id={id}/>)}
                    </div>)}
                </div>

                <div className="dialog-action">
                    <h3 className="error">{error && `Fehler: ${error}`}</h3>
                    <Button text="Link erstellen" onClick={submit}/>
                </div>
            </div>
        </div>
    )
}