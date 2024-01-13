"use client"

import Button from "@/components/button";
import ColorSelector from "@/components/colorSelector";
import DynamicImage from "@/components/dynamicImage";
import Logo from "@/components/logo";
import OverflowContainer from "@/components/overflowContainer";
import SearchBar from "@/components/searchBar";
import { useUser } from "@/components/userContext";
import UserModel from "@/models/userModel";
import { createGame, getUserDataWithId } from "@/utils/api";
import { getFriends } from "@/utils/friendlistApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { user } = useUser();
    const router = useRouter();

    const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
    const [selectedColor, setSelectedColor] = useState("RANDOM");
    const [friends, setFriends] = useState<UserModel[]>([]);
    const [search, setSearch] = useState("");

    const handleColorChange = (color: 'WHITE' | 'BLACK' | 'RANDOM') => {
        setSelectedColor(color);
    }

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await getFriends();

            const usersArray = await Promise.all(response.map(async userId => {
                return await getUserDataWithId(userId);
            }));

            setFriends(usersArray);
        }

        fetchFriends();
    }, []);

    const filteredFriends = friends.filter(friend => friend.username.toLowerCase().includes(search.toLowerCase()));
    
    const handleCreateGame = async () => {
        let whiteUserId: string | undefined = undefined; 

        if(user == null || selectedUser == null)
            return;

        if(selectedColor == 'WHITE')
            whiteUserId = user.userId;
        else if(selectedColor == 'BLACK')
            whiteUserId = selectedUser.userId;

        const gameId = await createGame(selectedUser.userId, whiteUserId);
        router.push(`/game/${gameId}`);
    }

    return (
        <>
            <Logo />
            <div className="flex flex-row gap-[9rem] pt-[14rem] w-[45%] mx-auto text-text font-bold">
                <div className="flex flex-col gap-[3.75rem] w-[60%]">
                    <div className="flex flex-col gap-[1.25rem]">
                        <span className="text-[2rem]">Play vs</span>
                        <div className="flex flex-row gap-[1rem] items-center">
                            {selectedUser ?
                                (<>
                                    <DynamicImage src={selectedUser.profilePictureUrl} fallbackSrc={"/images/defaultProfile.png"} className="bg-container w-[4.5rem] aspect-[1/1] shadow-small rounded-[0.25rem] flex justify-center items-center" />
                                    <div className="text-[1.5rem] flex flex-row gap-[0.5rem]">
                                        <span>{selectedUser.username}</span>
                                        <span className="text-tone-down">({selectedUser.rating})</span>
                                    </div>
                                </>
                                ) : (
                                    <>
                                        <div className="bg-container w-[4.5rem] aspect-[1/1] shadow-small rounded-[0.25rem] flex justify-center items-center">
                                            <span className="text-[3rem] select-none">?</span>
                                        </div>
                                        <span className="text-[1.5rem]">Please select an opponent...</span>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-[1.25rem]">
                        <span className="text-[2rem]">I play as</span>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <ColorSelector id="color-white" color="WHITE" isSelected={selectedColor === "WHITE"} className="bg-text" onClick={handleColorChange}>
                                <span className="font-chess-icons font-normal">♔</span>
                            </ColorSelector>
                            <span>OR</span>
                            <ColorSelector id="color-random" color="RANDOM" isSelected={selectedColor === "RANDOM"} onClick={handleColorChange}>
                                <span className="relative z-[1]">?</span>
                                <div className="absolute h-[100%] w-[50%] bg-text rounded-l-[0.25rem] top-0"></div>
                                <div className="absolute h-[100%] w-[50%] bg-container rounded-r-[0.25rem] right-0 top-0"></div>
                            </ColorSelector>
                            <span>OR</span>
                            <ColorSelector id="color-black" color="BLACK" isSelected={selectedColor === "BLACK"} className="bg-container" onClick={handleColorChange}>
                                <span className="font-chess-icons font-normal">♔</span>
                            </ColorSelector>
                        </div>
                    </div>
                    <Button id="create-game" className="bg-highlight text-[1.5rem] w-fit" disabled={selectedUser == null} onClick={handleCreateGame}>Create Game</Button>
                </div>
                <div className="w-[17.5rem] flex flex-col gap-[1rem]">
                    <div>
                        <SearchBar onInputChange={setSearch} />
                    </div>
                    {friends.length > 0 ? (
                        <OverflowContainer className="grow">
                            {filteredFriends.map((friend, index) => (
                                <div id={`friend-${index}`} key={friend.userId} className="flex flex-row items-center hover:bg-container-alt rounded-[0.25rem] p-[0.25rem] transition duration-[0.3s] cursor-pointer select-none" onClick={() => setSelectedUser(friend)}>
                                    <DynamicImage src={friend.profilePictureUrl} fallbackSrc={"/images/defaultProfile.png"} className="rounded-[2px] w-[2rem] aspect-[1/1] shadow-small bg-container" />
                                    <span className="ml-[0.5rem] mr-[0.25rem] font-normal">{friend.username}</span>
                                    <span className="font-normal text-tone-down">{`(${friend.rating})`}</span>
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