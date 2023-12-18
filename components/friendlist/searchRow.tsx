import { useEffect, useState } from "react";
import { useUser } from "../userContext";
import { getUserDataWithUsername } from "@/utils/userDataApi";
import UserModel from "@/models/userModel";
import SearchCard from "../friendCards/searchCard";

interface Props {
    searchQuery: string;
}

export default function SearchRow({ searchQuery }:Props) {
    const { user } = useUser();
    const [searchResult, setSearchResult] = useState<UserModel>();

    useEffect(() => {
        const fetchSearch = async () => {
            const response = await getUserDataWithUsername(searchQuery);
            
            if(response == null || user?.username == response.username)
                return;

            setSearchResult(response);
        }

        fetchSearch();
    }, [searchQuery]);

    return (
        <>
            {searchQuery && 
                <div className="flex flex-col gap-[1rem] w-fit">
                    <span className="text-text font-bold text-[1.25rem]">Search Result</span>
                    {searchResult ? <SearchCard user={searchResult}/> : <span className="text-tone-down text-[1rem]">No user found.</span>}
                </div>
            }
        </>  
    );

}