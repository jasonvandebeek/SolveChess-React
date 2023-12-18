"use client";

import FriendCard from "@/components/friendCards/friendCard";
import RequestCard from "@/components/friendCards/requestCard";
import SearchCard from "@/components/friendCards/searchCard";
import SentCard from "@/components/friendCards/sentCard";
import Logo from "@/components/logo";
import { getUserData, getUserId } from "@/utils/api";
import { useEffect, useState } from "react";


export default function Page() {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const fetchUser = async () => {
            const userId = await getUserId();
            if(userId == null)
                return;

            const user = await getUserData(userId);
            setUser(user);
        }

        fetchUser();
    }, [])

    return (
        <>
            <Logo/>
            <div className="absolute left-[12rem] top-[12rem] flex flex-col gap-[2rem]">
                <div className="flex flex-col gap-[1rem]">
                    <span className="text-text font-bold text-[1.25rem]">Search Result</span>
                    <SearchCard user={user}/>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <span className="text-text font-bold text-[1.25rem]">My Friend (5)</span>
                    <FriendCard user={user}/>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <span className="text-text font-bold text-[1.25rem]">Friend Requests (4)</span>
                    <RequestCard user={user}/>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <span className="text-text font-bold text-[1.25rem]">Requests Sent (3)</span>
                    <SentCard user={user}/>
                </div>
            </div>
        </> 
    );
}