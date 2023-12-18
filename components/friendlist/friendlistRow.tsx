import { useEffect, useState } from "react";
import UserModel from "@/models/userModel";
import { getUserDataWithId } from "@/utils/api";

interface Props {
    userIds: string[];
    searchQuery: string;
    renderItem: (friend: UserModel) => React.ReactNode;
    title: string;
    nonFoundMessage: string;
    hasCount: boolean;
}

export default function FriendlistRow({ userIds, searchQuery, renderItem, title, nonFoundMessage, hasCount }:Props) {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
    
            userIds.forEach(async userId => {
                const user = await getUserDataWithId(userId);
                
                setUsers((prevUsers) => [...prevUsers, user]);
            });
        }

        fetchFriends();
    }, []);

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className="flex flex-col gap-[1rem] w-fit">
                <span className="text-text font-bold text-[1.25rem]">{title} {hasCount && `(${filteredUsers.length})`}</span>
                {filteredUsers.length > 0 ? (
                    <div className="flex flex-row gap-[1.5rem]">
                        {filteredUsers && filteredUsers.map(user => renderItem(user))}
                    </div>
                ) : <span className="text-tone-down text-[1rem]">{nonFoundMessage}</span>}
            </div>
        </>  
    );

}