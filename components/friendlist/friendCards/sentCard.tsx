import UserModel from "@/models/userModel";
import CardBase from "./cardBase";
import IconButton from "../../iconButton";


interface Props {
    user: UserModel;
    onCancelClick: (userId: string) => void;
}

export default function SentCard({ user, onCancelClick }:Props) {
    return (
        <CardBase user={user}>
            <IconButton icon="fi fi-br-cross-small" className="bg-container-alt text-text font-bold hover:bg-error" onClick={() => onCancelClick(user.userId)}>Cancel</IconButton>
        </CardBase>
    );
}