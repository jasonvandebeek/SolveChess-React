import UserModel from "@/models/userModel";

interface Props {
    user: UserModel;
    onRemoveClick: (userId: string) => void;
}

export default function FriendCard({ user, onRemoveClick }:Props) {
    return (
        <div className="group flex flex-col text-center w-[8rem] text-[0.85rem]">
            <img src={user.profilePictureUrl} className="mx-auto w-[4.5rem] aspect-[1/1] rounded-[0.125rem] shadow-small"/>
            <div className="flex flex-col mt-[0.75rem] mb-[0.25rem] ">
                <span className="font-bold text-text truncate ">{user.username}</span>
                <span className="text-[0.85em] text-tone-down mt-[-0.125rem]">Rating: {user.rating}</span>
            </div>
            <div className="opacity-[0] group-hover:opacity-[100] transition duration-[0.3s] hover:scale-[1.3] w-fit mx-auto" onClick={() => onRemoveClick(user.userId)}>
                <i className="flex justify-center fi fi-br-cross-small text-[2em] text-text cursor-pointer hover:text-error"/>
            </div>
        </div>
    );
}