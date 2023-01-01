import TextBox from "@/common/components/TextBox";
import Button from "@/common/components/Button";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import LinkChooser from "@/pages/Home/components/LinkChooser";
import DomainButton from "@/pages/Home/components/ManageArea/components/DomainButton";
import "./styles.sass";

export const ManageArea = () => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="manage-area">
            <LinkChooser isOpen={showDialog} close={() => setShowDialog(false)}/>
            <TextBox icon={faSearch} placeholder="Link suchen"/>
            <div className="right-area">
                <DomainButton />
                <Button text="Link erstellen" onClick={() => setShowDialog(true)} />
            </div>
        </div>
    )
}