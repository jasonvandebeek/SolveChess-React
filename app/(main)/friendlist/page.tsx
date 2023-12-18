"use client";

import FriendCard from "@/components/friendCards/friendCard";
import FriendlistRow from "@/components/friendlist/friendlistRow";
import SearchRow from "@/components/friendlist/searchRow";
import Logo from "@/components/logo";
import SearchBar from "@/components/searchBar";
import UserModel from "@/models/userModel";
import { getFriends } from "@/utils/api";
import { ReactNode, useEffect, useState } from "react";

export default function Page() {
    const [search, setSearch] = useState('');

    const handleSearch = async (value: string) => {
        setSearch(value);
    }

    const [friends, setFriends] = useState<string[]>([]);
    const [requests, setRequests] = useState<string[]>([]);
    const [outgoing, setOutgoing] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setFriends(await getFriends())
        };

        fetchData();
    }, []);

    return (
        <>
            <Logo/>
            <div className="w-[60%] h-[100vh] flex flex-col gap-[3rem] justify-center mx-auto overflow-hidden">
                <div className="mx-auto w-[60%]">
                    <SearchBar onEnterPress={handleSearch}/>
                </div>
                <div className="flex flex-col gap-[2rem]">
                    <SearchRow searchQuery={search}/>
                    <FriendlistRow searchQuery={search} userIds={friends} renderItem={(user: UserModel) => { return <FriendCard user={user}/> }}/>
                </div>
            </div>
        </> 
    );
}