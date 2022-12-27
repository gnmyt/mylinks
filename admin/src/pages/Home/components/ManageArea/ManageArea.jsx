import "./styles.sass";
import TextBox from "@/common/components/TextBox";
import Button from "@/common/components/Button";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export const ManageArea = () => {
    return (
        <div className="manage-area">
            <TextBox icon={faSearch} placeholder="Link suchen"/>
            <Button text="Link erstellen" />
        </div>
    )
}