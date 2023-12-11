"use client"

import Account from "@/components/account";
import Button from "@/components/button";
import ColorSelector from "@/components/colorSelector";
import Logo from "@/components/logo";
import SearchBar from "@/components/search/searchBar";
import SearchHandler from "@/components/search/searchHandler";
import { useState } from "react";

export default function Page() {
    const [selectedColor, setSelectedColor] = useState("RANDOM");

    const handleColorChange = (color: 'WHITE' | 'BLACK' | 'RANDOM') => {
        setSelectedColor(color);
    }

    return (
        <>
            <Logo/>
            <Account/>
            <div className="flex flex-row gap-[9rem] pt-[16rem] w-fit mx-auto text-text font-bold">
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
                        <SearchHandler handleSearchChange={() => {}} searchableObjects={[]}>
                            <SearchBar property={""}/>
                        </SearchHandler>
                    </div>
                    <div className="grow">

                    </div>
                </div>
            </div>
        </>
    )
}