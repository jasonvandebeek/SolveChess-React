'use client'

import { useEffect, useState } from "react";
import { getUserData, getUserId } from "@/utils/api";
import Notification from "./notification"
import Button from "./button";
import Link from "next/link";

export default function Account() {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await getUserId();
                setUserId(userId);
                if(userId == null)
                    return;

                const userData = await getUserData(userId);
                setUsername(userData.username);
                setProfilePictureUrl(userData.profilePictureUrl);
            } catch (error) {
                //Handle error (display an error message)
            } 
          };
      
          fetchUserData();
    }, [userId]);

    return (
        <div className="flex flex-row gap-[1.5rem] items-center text-[rem] text-text select-none absolute top-[2rem] right-[3rem]">
            {userId === null ? (
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
                        <span>{username}</span>
                        <img src={profilePictureUrl} className="h-[2.5rem] rounded-[4px] aspect-[1/1] shadow-small"/>
                    </div>
                </>
            )}
        </div>
    )
}