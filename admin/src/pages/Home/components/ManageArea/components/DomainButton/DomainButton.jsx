import {useContext, useState} from "react";
import {DomainDialog} from "@/pages/Home/components/DomainDialog/DomainDialog.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import DomainContext from "@/common/contexts/Domain";
import "./styles.sass";

export const DomainButton = () => {
    const [currentDomain] = useContext(DomainContext);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <DomainDialog isOpen={dialogOpen} close={() => setDialogOpen(false)} />
            <div className="domain-button" onClick={() => setDialogOpen(true)}>
                <FontAwesomeIcon icon={faGlobe} />
                <p>{currentDomain}</p>
            </div>
        </>
    )
}