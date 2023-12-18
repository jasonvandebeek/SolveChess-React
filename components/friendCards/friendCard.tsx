import UserModel from "@/models/userModel";

interface Props {
    user: UserModel;
}

export default function FriendCard({ user }:Props) {
    return (
        <div className="group flex flex-col text-center w-[12rem] mb-[-1rem]">
            <img src={user.profilePictureUrl} className="mx-auto w-[5rem] aspect-[1/1] rounded-[0.125rem] shadow-small"/>
            <div className="flex flex-col mt-[0.75rem] mb-[0.25rem]">
                <span className="font-bold text-text truncate">{user.username}</span>
                <span className="text-[0.85rem] text-tone-down mt-[-0.125rem]">Rating: {user.rating}</span>
            </div>
            <div className="opacity-[0] group-hover:opacity-[100] transition duration-[0.3s] hover:scale-[1.3] w-fit mx-auto">
                <i className="flex justify-center fi fi-br-cross-small text-[2rem] text-text cursor-pointer hover:text-error"/>
            </div>
        </div>
    );
}