import DynamicImage from "@/components/dynamicImage";
import UserModel from "@/models/userModel";
import { ReactNode } from "react";

interface Props {
    user: UserModel;
    children?: ReactNode;
}

export default function CardBase({ user, children }:Props) {
    return (
        <div className="block">
            <div className="shadow-small bg-container rounded-[0.25rem] w-[16rem] p-[0.75rem] gap-[0.75rem] flex items-center">
                <DynamicImage src={user.profilePictureUrl} fallbackSrc="/images/defaultProfile.png" className="w-[4.5rem] aspect-[1/1] rounded-[0.125rem] shadow-small"/>
                <div className="h-[4.5rem] w-[calc(100%-6rem)] flex flex-col justify-between text-[0.85rem]">
                    <div className="flex flex-col">
                        <span className="font-bold text-text truncate">{user.username}</span>
                        <span className="text-[0.85em] text-tone-down mt-[-0.125rem]">Rating: {user.rating}</span>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}