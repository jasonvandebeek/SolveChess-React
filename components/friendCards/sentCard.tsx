import UserModel from "@/models/userModel";
import CardBase from "./cardBase";
import IconButton from "../iconButton";


interface Props {
    user: UserModel;
}

export default function SentCard({ user }:Props) {
    return (
        <CardBase user={user}>
            <IconButton icon="fi fi-br-cross-small" className="bg-container-alt text-text font-bold hover:bg-error">Cancel</IconButton>
        </CardBase>
    );
}