"use client"

import { useState } from "react";
import GameCard from "@/components/gameCard";
import Logo from "@/components/logo";
import './animations.css';
import Button from "@/components/button";
import { useUser } from "@/components/userContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user } = useUser();
    const router = useRouter();

    const [state, setState] = useState(0);
    const [wait, setWait] = useState(false);

    const handlePlayButtonClick = () => {
        if(!user)
            router.push("/login");

        if (!wait) {
            setWait(true);

            setTimeout(() => {
                setState(1);
                setWait(false);
            }, 500);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center h-[100vh] justify-center overflow-hidden">
                {state === 0 ? (
                    <div className="flex flex-col items-center mt-[-3rem] select-none">
                        <span className={`text-text font-extrabold font-montserrat-alt text-[5rem] drop-shadow-large ${wait && 'animate-fall-down-right-delayed'}`}>SOLVECHESS</span>
                        <Button id="play-button" className={`bg-highlight px-[3rem] text-[1.5rem] ${wait && 'animate-fall-down-left'}`} onClick={handlePlayButtonClick}>Play</Button>
                    </div>
                ) : (
                    <>
                        <Logo className="animate-bounce-in-left"/>
                        <div className="flex flex-row gap-[4rem]">
                            <GameCard title="Queue Up" className="animate-bounce-up-1"/>
                            <a href="/create-game/ai"><GameCard title="Play AI" className="animate-bounce-up-2"/></a>
                            <a id="create-game-player" href="/create-game/player"><GameCard title="Create Game" className="animate-bounce-up-3"/></a>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
