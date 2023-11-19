'use client'

import { useEffect, useState } from "react";
import LoggedInAccount from "./loggedInAccount";
import { getUserData } from "@/app/utils/api";

interface Props {
    userId: string | null;
}

export default function Account({ userId }:Props) {

    const [username, setUsername] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if(userId == null)
                return;

            try {
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
        <div className="flex flex-row gap-[1.5rem] items-center text-[rem] text-text select-none">
            {userId === null ? (
                <>
                    <a href="/login"><span className="cursor-pointer">Login</span></a>
                    <a href="/signup"><button className="font-bold px-[1.5rem] py-[0.75rem] shadow-small bg-highlight rounded-[2px] cursor-pointer shadow-small hover:scale-[1.1] transition duration-[0.2s]">Sign Up</button></a>
                </>
            ) : (
                <LoggedInAccount username={username} profilePictureUrl={profilePictureUrl} />
            )}
        </div>
    )
}