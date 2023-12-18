import UserModel from "@/models/userModel";
import CardBase from "./cardBase";
import IconButton from "../iconButton";


interface Props {
    user: UserModel;
}

export default function RequestCard({ user }:Props) {
    return (
        <CardBase user={user}>
            <div className="flex flex-row gap-[0.5rem]">
                <IconButton icon="fi fi-br-user-check" className="bg-highlight text-text font-bold">Accept</IconButton>
                <IconButton icon="fi-br-cross-small" className="bg-container-alt text-text font-bold hover:scale-[1.2] hover:bg-error"/>
            </div>
        </CardBase>
    );
}