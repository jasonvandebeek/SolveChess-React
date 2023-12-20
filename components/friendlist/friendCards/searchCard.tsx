import UserModel from "@/models/userModel";
import CardBase from "./cardBase";
import IconButton from "../../iconButton";


interface Props {
    user: UserModel;
    onAddFriendClick: (userId: string) => void;
}

export default function SearchCard({ user, onAddFriendClick }:Props) {
    return (
        <CardBase user={user}>
            <IconButton icon="fi fi-br-user-add" className="bg-highlight text-text font-bold" onClick={() => onAddFriendClick(user.userId)}>Add Friend</IconButton>
        </CardBase>
    );
}