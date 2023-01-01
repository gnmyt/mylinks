import DialogContext from "@/common/contexts/Dialog";
import DomainHeader from "@/pages/Home/components/DomainDialog/components/DomainHeader";
import TextBox from "@/common/components/TextBox";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import Button from "@/common/components/Button";
import {useContext, useState} from "react";
import {putRequest} from "@/common/utils/RequestUtil.js";
import DomainContext from "@/common/contexts/Domain";
import "./styles.sass";

export const AddDomainDialog = () => {
    const [currentDomain, updateCurrentDomain, domains, updateDomains] = useContext(DomainContext);
    const [domainName, setDomainName] = useState("");
    const close = useContext(DialogContext);

    const addDomain = async () => {
        const request = await putRequest("/domains", {domainName});
        if (request.ok) {
            close();
            updateDomains();
        }
    }

    return (
        <div className="domain-dialog">
            <DomainHeader title="Domain hinzufügen"/>
            <TextBox icon={faGlobe} placeholder="Domain" value={domainName}
                     onUpdate={(e) => setDomainName(e.target.value)}/>
            <Button text="Domain hinzufügen" onClick={addDomain}/>
        </div>
    )
}