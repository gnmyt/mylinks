import "./styles.sass";
import TextBox from "@/common/components/TextBox";
import Button from "@/common/components/Button";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import LinkDialog from "@/pages/Home/components/LinkDialog";
import {useState} from "react";

export const ManageArea = () => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="manage-area">
            <LinkDialog module="link" isOpen={showDialog} close={() => setShowDialog(false)}/>
            <TextBox icon={faSearch} placeholder="Link suchen"/>
            <Button text="Link erstellen" onClick={() => setShowDialog(true)} />
        </div>
    )
}