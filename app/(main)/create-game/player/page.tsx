"use client"

import Account from "@/components/account";
import Button from "@/components/button";
import ColorSelector from "@/components/colorSelector";
import Logo from "@/components/logo";
import OverflowContainer from "@/components/overflowContainer";
import SearchBar from "@/components/searchBar";
import { getUserDataWithId } from "@/utils/api";
import { getFriends } from "@/utils/friendlistApi";
import axios from "axios";
import { useEffect, useState } from "react";

interface Friend {
    Username: string;
    Rating: string; 
    Image: string;
}

export default function Page() {
    const [selectedColor, setSelectedColor] = useState("RANDOM");
    const [friends, setFriends] = useState<Friend[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);

    const handleColorChange = (color: 'WHITE' | 'BLACK' | 'RANDOM') => {
        setSelectedColor(color);
    }

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await getFriends();

            const friends: Friend[] = [];
            response.forEach(async friendId => {
                const friendResponse = await getUserDataWithId(friendId);
                const image = await (await axios.get(friendResponse.profilePictureUrl)).data.blob();
                
                friends.push({
                    Username: friendResponse.username,
                    Rating: friendResponse.rating,
                    Image: URL.createObjectURL(image)
                });
            });

            setFriends(friends);
        }

        fetchFriends();
    }, []);

    return (
        <>
            <Logo/>
            <div className="flex flex-row gap-[9rem] pt-[14rem] w-fit mx-auto text-text font-bold">
                <div className="flex flex-col gap-[3.75rem]">
                    <div className="flex flex-col gap-[1.25rem]">
                        <span className="text-[2rem]">Play vs</span>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <div className="bg-container w-[4.5rem] aspect-[1/1] shadow-small rounded-[0.25rem] flex justify-center items-center">
                                <span className="text-[3rem] select-none">?</span>
                            </div>
                            <span className="text-[1.5rem]">Please select an opponent...</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[1.25rem]">
                        <span className="text-[2rem]">I play as</span>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <ColorSelector color="WHITE" isSelected={selectedColor === "WHITE"} className="bg-text" onClick={handleColorChange}>
                                <span className="font-chess-icons font-normal">♔</span>
                            </ColorSelector>
                            <span>OR</span>
                            <ColorSelector color="RANDOM" isSelected={selectedColor === "RANDOM"} onClick={handleColorChange}>
                                <span className="relative z-[1]">?</span>
                                <div className="absolute h-[100%] w-[50%] bg-text rounded-l-[0.25rem] top-0"></div>
                                <div className="absolute h-[100%] w-[50%] bg-container rounded-r-[0.25rem] right-0 top-0"></div>
                            </ColorSelector>
                            <span>OR</span>
                            <ColorSelector color="BLACK" isSelected={selectedColor === "BLACK"} className="bg-container" onClick={handleColorChange}>
                                <span className="font-chess-icons font-normal">♔</span>
                            </ColorSelector>
                        </div>
                    </div>
                    <Button className="text-[1.5rem] w-fit">Create Game</Button>
                </div>
                <div className="w-[17.5rem] flex flex-col gap-[1rem]">
                    <div>
                        <SearchBar/>
                    </div>
                    {friends.length > 0 ? (
                        <OverflowContainer className="grow">
                            {filteredFriends.map(friend => (
                                <div className="flex flex-col items-center">
                                    <img src={friend.Image} className="rounded-[2px] w-[2rem] aspect-[1/1] shadow-small"/>
                                    <span className="ml-[0.5rem] mr-[0.25rem]">{friend.Username}</span>
                                    <span>{`(${friend.Rating})`}</span>
                                </div>
                            ))}
                        </OverflowContainer>
                    ) : (
                        <span className="w-[100%] text-center">No friends found!</span>
                    )}
                    
                </div>
            </div>
        </>
    )
}