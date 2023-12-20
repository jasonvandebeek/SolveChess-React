"use client";

import FriendCard from "@/components/friendlist/friendCards/friendCard";
import RequestCard from "@/components/friendlist/friendCards/requestCard";
import SentCard from "@/components/friendlist/friendCards/sentCard";
import FriendlistRow from "@/components/friendlist/friendlistRow";
import SearchRow from "@/components/friendlist/searchRow";
import Logo from "@/components/logo";
import SearchBar from "@/components/searchBar";
import { useUser } from "@/components/userContext";
import UserModel from "@/models/userModel";
import { getFriendRequests, getFriends, getSentRequests } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Page() {
    const { user } = useUser();
    const [search, setSearch] = useState('');

    const [friends, setFriends] = useState<string[]>([]);
    const [requests, setRequests] = useState<string[]>([]);
    const [sentRequests, setSentRequests] = useState<string[]>([]);

    const [ignoredIds, setIgnoredIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setFriends(await getFriends());
            //setRequests(await getFriendRequests());
            setSentRequests(await getSentRequests());
            setRequests(["1","1","1","1","1","1"])
        };

        fetchData();
    }, []);

    useEffect(() => {
        let ignoredIds: string[] = [];
        
        if(user)
            ignoredIds.push(user.userId);

        ignoredIds = ignoredIds.concat(friends).concat(requests).concat(sentRequests);

        setIgnoredIds(ignoredIds);
    }, [friends, requests, sentRequests]);

    const handleRemove = (userId: string) => {
        const updatedFriends = friends.filter(friend => friend !== userId);
        setFriends(updatedFriends);
    }

    const handleAddFriend = (userId: string) => {
        setRequests((prevRequests) => [...prevRequests, userId]);
        setSearch("");
    }

    const handleAccept = (userId: string) => {
        const updatedRequests = requests.filter(request => request !== userId);
        setRequests(updatedRequests);

        setFriends((prevFriends) => [...prevFriends, userId]);
    }

    const handleDeny = (userId: string) => {
        const updatedRequests = requests.filter(request => request !== userId);
        setRequests(updatedRequests);
    }

    const handleCancel = (userId: string) => {
        const updatedRequests = sentRequests.filter(request => request !== userId);
        setSentRequests(updatedRequests);
    }

    return (
        <>
            <Logo/>
            <div className="w-[60%] h-[100vh] flex flex-col gap-[2rem] pt-[8rem] mx-auto">
                <div className="mx-auto w-[60%]">
                    <SearchBar onEnterPress={setSearch}/>
                </div>
                <div className="flex flex-col gap-[1.5rem]">
                    <SearchRow searchQuery={search} onAddFriendClick={handleAddFriend} ignoredIds={ignoredIds}/>
                    <FriendlistRow 
                        searchQuery={search}
                        userIds={friends}
                        renderItem={(user: UserModel) => { return <FriendCard key={user.userId} user={user} onRemoveClick={handleRemove}/>; } } 
                        title={"My Friends"} 
                        nonFoundMessage={"No friends found."}                      
                    />
                    <FriendlistRow 
                        searchQuery={search}
                        userIds={requests}
                        renderItem={(user: UserModel) => { return <RequestCard key={user.userId} user={user} onAcceptClick={handleAccept} onDenyClick={handleDeny}/>; } } 
                        title={"Friend Requests"} 
                        nonFoundMessage={"No friend requests found."} 
                        hideOnNone={true}                        
                    />
                    <FriendlistRow 
                        searchQuery={search}
                        userIds={sentRequests}
                        renderItem={(user: UserModel) => { return <SentCard key={user.userId} user={user} onCancelClick={handleCancel}/>; } } 
                        title={"Requests Sent"} 
                        nonFoundMessage={"No request sent."}  
                        hideOnNone={true}                   
                    />
                </div>
            </div>
        </> 
    );
}