import {useContext, useEffect, useRef, useState} from "react";
import Button from "@/common/components/Button";
import DialogHeader from "@/pages/Home/components/LinkDialog/components/DialogHeader";
import InputGroup from "@/pages/Home/components/LinkDialog/components/InputGroup";
import ModuleContext from "@/common/contexts/Module";
import {patchRequest, putRequest} from "@/common/utils/RequestUtil.js";
import LinkContext from "@/common/contexts/Link";
import {DialogProvider} from "@/common/contexts/Dialog";
import {DomainContext} from "@/common/contexts/Domain/DomainContext.jsx";
import "./styles.sass";

export const LinkDialog = (props) => {
    const groups = useRef();
    const [links, updateLinks] = useContext(LinkContext);
    const [currentDomain] = useContext(DomainContext);
    const [error, setError] = useState("");
    const modules = useContext(ModuleContext);
    const [module, setModule] = useState();

    useEffect(() => {
        if (!modules || props.module === null) return;
        setModule(modules[props.module]);
    }, [modules, props.module]);

    const close = () => {
        setError("");
        props?.close();
    }

    const getBody = () => {
        const body = {meta: {}, type: props.module, domainName: currentDomain};
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
        const response = await (props.editMode ? patchRequest(`/link/${props.id}`, getBody()) : putRequest("/link", getBody()));
        if (response.status === 200) {
            updateLinks();
            close();
            return;
        }
        setError((await response.json()).message);
    }

    if (!props.isOpen) return <></>;

    return (
        <DialogProvider submit={submit} close={close}>
            <DialogHeader module={module.name} icon={module.icon} editMode={props.editMode}/>

            <div className="dialog-main" ref={groups}>
                <div className="dialog-group">
                    <h2>Allgemein</h2>
                    <InputGroup title="Neuer Link" description="Wähle deinen neuen Link" id="accessId" autoComplete="off" default={props.accessId}/>
                    <InputGroup title="Titel" description="Worum geht es hier?" id="title" autoComplete="off" default={props.title}/>
                    <InputGroup title="Tags" description="Trenne Tags mit einem Komma" id="tags" autoComplete="off" default={props.tags?.join(",")}/>
                </div>

                {module.meta.map(group => <div className="dialog-group" key={group.name} id={group.name}>
                    <h2>{group.name}</h2>

                    {Object.entries(group.fields).map(([id, obj]) => <InputGroup title={obj.name}
                                                                                 description={obj.description}
                                                                                 key={id} id={id} default={props.meta ? props.meta[id] : ""}/>)}
                </div>)}
            </div>

            <div className="dialog-action">
                <h3 className="error">{error && `Fehler: ${error}`}</h3>
                <Button text={`Link ${props.editMode ? "aktualisieren" : "erstellen"}`} onClick={submit}/>
            </div>
        </DialogProvider>
    )
}