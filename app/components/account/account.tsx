'use client'

import { use, useEffect, useState } from "react";
import axios from "axios";
import LoggedInAccount from "./loggedInAccount";

interface Props {
    userId: string | null;
}

export default function Account({ userId }:Props) {

    const [username, setUsername] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId == null) {
                    return;
                }
    
                const userDataResponse = await axios.get(`https://localhost:7211/Users/${userId}`, { withCredentials: true });
                setUsername(userDataResponse.data['username']);
                setProfilePictureUrl(userDataResponse.data['profilePictureUrl']);
            } catch (error: any) {
                if (axios.isAxiosError(error) && error.response?.status === 401)
                    return;
    
                if (error.code === 'ERR_NETWORK')
                    return;

                console.error(error);
            };
        };
    
        fetchData();
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