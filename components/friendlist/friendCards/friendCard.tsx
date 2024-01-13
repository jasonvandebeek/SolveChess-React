import Button from "@/components/button";
import DynamicImage from "@/components/dynamicImage";
import UserModel from "@/models/userModel";
import { useState } from "react";

interface Props {
    user: UserModel;
    onRemoveClick: (userId: string) => void;
}

export default function FriendCard({ user, onRemoveClick }:Props) {
    const [confirmation, setConfirmation] = useState(false);

    const handleConfirmation = () => {
        setConfirmation(false);
        onRemoveClick(user.userId);
    }

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <>
            <div className="group flex flex-col text-center w-[8rem] text-[0.85rem]">
                <DynamicImage src={user.profilePictureUrl} fallbackSrc="/images/defaultProfile.png" className="mx-auto w-[4.5rem] aspect-[1/1] rounded-[0.125rem] shadow-small bg-container"/>
                <div className="flex flex-col mt-[0.75rem] mb-[0.25rem]">
                    <span className="font-bold text-text truncate ">{user.username}</span>
                    <span className="text-[0.85em] text-tone-down mt-[-0.125rem]">Rating: {user.rating}</span>
                </div>
                <div className="opacity-[0] group-hover:opacity-[100] transition duration-[0.3s] hover:scale-[1.3] w-fit mx-auto" onClick={() => setConfirmation(true)}>
                    <i className="flex justify-center fi fi-br-cross-small text-[2em] text-text cursor-pointer hover:text-error"/>
                </div>
            </div>
            {confirmation && (
                <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center" onClick={() => setConfirmation(false)}>
                    <div className="flex flex-col justify-center bg-container shadow-small z-[1] select-none" onClick={stopPropagation}>
                        <span className="p-[1rem] w-[24rem] text-center text-text text-bold">Do you really want to remove <b>{user.username}</b> as a friend?</span>
                        <div className="px-[2rem] pt-[0] pb-[1rem] flex flex-row gap-[2rem]">
                            <Button className="grow bg-tone-down hover:bg-highlight shadow-small" onClick={() => setConfirmation(false)}>Cancel</Button>
                            <Button className="grow bg-error shadow-small" onClick={handleConfirmation}>Remove</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}