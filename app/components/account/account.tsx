'use client'

import { use, useEffect, useState } from "react";

import axios from "axios";
import LoggedInAccount from "./loggedInAccount";

export default function Account() {

    const [username, setUsername] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userIdResponse = await axios.get('https://localhost:7121/auth/userId', { withCredentials: true });
    
                if (userIdResponse.status === 401) {
                    return; // No console log or further code execution for 401 response
                }
    
                const userDataResponse = await axios.get(`https://localhost:7211/Users/${userIdResponse.data}`, { withCredentials: true });
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
    }, []);

    return (
        <div className="flex flex-row gap-[1.5rem] items-center text-[rem] text-text select-none">
            {username === null ? (
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