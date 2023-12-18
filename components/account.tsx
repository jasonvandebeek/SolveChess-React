'use client'

import Notification from "./notification"
import Button from "./button";
import Link from "next/link";
import { useUser } from "./userContext";

export default function Account() {
    const { user } = useUser();

    return (
        <div className="flex flex-row gap-[1.5rem] items-center text-[rem] text-text select-none absolute top-[2rem] right-[3rem]">
            {user === null ? (
                <>
                    <a href="/login"><span className="cursor-pointer">Login</span></a>
                    <a href="/signup"><Button>Sign Up</Button></a>
                </>
            ) : (
                <>
                    <div className="flex flex-row gap-[1rem] items-center">
                        <Link href="/friendlist"><i className=" text-[1.25rem] fi fi-sr-users text-text flex items-center cursor-pointer"/></Link>
                        <Notification/>
                    </div>
                    <div className="flex flex-row gap-[1rem] items-center cursor-pointer text-text">
                        <span>{user.username}</span>
                        <img src={user.profilePictureUrl} className="h-[2.5rem] rounded-[4px] aspect-[1/1] shadow-small"/>
                    </div>
                </>
            )}
        </div>
    )
}