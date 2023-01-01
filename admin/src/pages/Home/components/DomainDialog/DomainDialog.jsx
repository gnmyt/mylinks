import {DialogProvider} from "@/common/contexts/Dialog";
import DomainHeader from "@/pages/Home/components/DomainDialog/components/DomainHeader";
import DomainItem from "@/pages/Home/components/DomainDialog/components/DomainItem";
import {useContext, useState} from "react";
import DomainContext from "@/common/contexts/Domain";
import Button from "@/common/components/Button";
import AddDomainDialog from "@/pages/Home/components/DomainDialog/components/AddDomainDialog";
import "./styles.sass";

export const DomainDialog = (props) => {
    const [currentDomain, setCurrentDomain, domains] = useContext(DomainContext);
    const [dialogOpen, setDialogOpen] = useState(false);

    const openAddDialog = () => {
        props.close();
        setDialogOpen(true);
    }

    return (
        <>
            {dialogOpen && <DialogProvider close={() => setDialogOpen(false)}><AddDomainDialog/></DialogProvider>}
            {props.isOpen && <DialogProvider close={props.close}>
                <div className="domain-dialog">
                    <DomainHeader/>
                    <div className="domain-area">
                        {domains.map((domain) => <DomainItem domainName={domain} key={domain} onClick={() => setCurrentDomain(domain)}/>)}
                        {domains.length === 0 && <p>Keine Domains erstellt</p>}
                    </div>
                    <div className="button-area">
                        <Button text="Domain hinzufügen" onClick={openAddDialog}/>
                    </div>
                </div>
            </DialogProvider>}
        </>
    );
}