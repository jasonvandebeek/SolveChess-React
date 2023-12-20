import UserModel from "@/models/userModel";
import CardBase from "./cardBase";
import IconButton from "../../iconButton";


interface Props {
    user: UserModel;
    onAcceptClick: (userId: string) => void;
    onDenyClick: (userId: string) => void;
}

export default function RequestCard({ user, onAcceptClick, onDenyClick }:Props) {
    return (
        <CardBase user={user}>
            <div className="flex flex-row gap-[0.5rem]">
                <IconButton icon="fi fi-br-user-check" className="bg-highlight text-text font-bold" onClick={() => onAcceptClick(user.userId)}>Accept</IconButton>
                <IconButton icon="fi fi-br-cross-small" className="bg-container-alt text-text font-bold hover:bg-error" onClick={() => onDenyClick(user.userId)}/>
            </div>
        </CardBase>
    );
}