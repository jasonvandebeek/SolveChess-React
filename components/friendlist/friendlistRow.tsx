import { useEffect, useState } from "react";
import UserModel from "@/models/userModel";
import { getUserDataWithId } from "@/utils/api";
import Scroller from "./scroller";

interface Props {
    userIds: string[];
    searchQuery: string;
    renderItem: (friend: UserModel) => React.ReactNode;
    title: string;
    nonFoundMessage: string;
    hideOnNone?: boolean;
}

export default function FriendlistRow({ userIds, searchQuery, renderItem, title, nonFoundMessage, hideOnNone = false }:Props) {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const usersArray = await Promise.all(userIds.map(async userId => {
                return await getUserDataWithId(userId);
            }));
    
            setUsers(usersArray);
        }
    
        fetchFriends();
    }, [userIds]);

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            {!(hideOnNone && userIds.length == 0) &&
                <div className="flex flex-col gap-[0.75rem] w-[100%] mb-[0.5rem]">
                    <span className="text-text font-bold text-[1rem]">{title} {`(${filteredUsers.length})`}</span>
                    {filteredUsers.length > 0 ? (
                        <Scroller>
                            {filteredUsers && filteredUsers.map(user => renderItem(user))}
                        </Scroller>
                    ) : <span className="mt-[-0.2rem] text-tone-down text-[0.8em]">{nonFoundMessage}</span>}
                </div>
            }
        </>  
    );

}