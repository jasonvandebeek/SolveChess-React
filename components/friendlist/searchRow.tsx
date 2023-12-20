import { useEffect, useState } from "react";
import { useUser } from "../userContext";
import { getUserDataWithUsername } from "@/utils/userDataApi";
import UserModel from "@/models/userModel";
import SearchCard from "./friendCards/searchCard";

interface Props {
    searchQuery: string;
    onAddFriendClick: (userId: string) => void;
    ignoredIds: string[];
}

export default function SearchRow({ searchQuery, onAddFriendClick, ignoredIds }:Props) {
    const [searchResult, setSearchResult] = useState<UserModel>();

    useEffect(() => {
        const fetchSearch = async () => {
            if(searchQuery.trim() == "")
                return;

            const response = await getUserDataWithUsername(searchQuery);
            
            if(response == null || ignoredIds.includes(response.userId))
                return;

            setSearchResult(response);
        }

        fetchSearch();
    }, [searchQuery]);

    return (
        <>
            {searchQuery && 
                <div className="flex flex-col gap-[1rem] w-fit">
                    <span className="text-text font-bold text-[1rem]">Search Result</span>
                    {searchResult ? <SearchCard user={searchResult} onAddFriendClick={onAddFriendClick}/> : <span className="mt-[-0.5rem] text-tone-down text-[0.8em]">No user found.</span>}
                </div>
            }
        </>  
    );

}