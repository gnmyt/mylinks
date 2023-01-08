import {DialogProvider} from "@/common/contexts/Dialog";
import ModuleContext from "@/common/contexts/Module";
import {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LinkDialog from "@/pages/Home/components/LinkDialog";
import "./styles.sass";

export const LinkChooser = (props) => {
    const [module, setModule] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const switchModule = (id) => {
        setModule(id);
        props.close();
        setIsOpen(false);
    }

    useEffect(() => {
        if (module !== null) setIsOpen(true);
    }, [module]);

    const modules = useContext(ModuleContext);
    if (!modules) return;

    return (
        <>
            <LinkDialog module={module} isOpen={isOpen} close={() => switchModule(null)}/>
            {props.isOpen && <DialogProvider close={props.close}>

                <div className="module-area">
                    {Object.entries(modules).map(([id, obj]) => <div className="module-item" key={id} onClick={() => switchModule(id)}>
                        <div className="module-icon">
                            <FontAwesomeIcon icon={["fas", obj.icon]}/>
                        </div>
                        <h3>{obj.name}</h3>
                    </div>)}
                </div>
            </DialogProvider>}
        </>
    );
}
