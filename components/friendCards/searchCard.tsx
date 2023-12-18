import UserModel from "@/models/userModel";
import CardBase from "./cardBase";
import IconButton from "../iconButton";


interface Props {
    user: UserModel;
}

export default function SearchCard({ user }:Props) {
    return (
        <CardBase user={user}>
            <IconButton icon="fi fi-br-user-add" className="bg-highlight text-text font-bold">Add Friend</IconButton>
        </CardBase>
    );
}