"use client"

import { useEffect, useState } from "react";
import Account from "../components/account/account";
import GameCard from "../components/gameCard";
import Logo from "../components/logo";
import './animations.css'
import axios from "axios";
import Head from 'next/head'

export default function Page() {
    const [userId, setUserId] = useState<string | null>(null);
    const [state, setState] = useState(0);
    const [wait, setWait] = useState(false);

    const handlePlayButtonClick = () => {
        if (!wait) {
            setWait(true);

            setTimeout(() => {
                setState(1);
                setWait(false);
            }, 500);
        }
    };

    useEffect(() => {
        
        axios.get('https://localhost:7121/auth/userId', { withCredentials: true })
            .then(response => {
                if(response.data === "") {
                    setUserId(null);
                } else {
                    setUserId(response.data);
                }
            });
            
    }, [])

    return (
        <>
            <div className="absolute top-[2rem] right-[3rem]">
                <Account userId={userId}/>
            </div>
            <div className="flex flex-col items-center h-[100vh] justify-center overflow-hidden">
                {state === 0 ? (
                    <div className="flex flex-col items-center mt-[-3rem] select-none">
                        <span className={`text-text font-extrabold font-montserrat-alt text-[5rem] drop-shadow-large ${wait && 'animate-fall-down-right-delayed'}`}>SOLVECHESS.AI</span>
                        <button className={`text-text font-bold text-[1.5rem] py-[0.75rem] px-[3rem] bg-highlight rounded-[2px] shadow-small hover:scale-[1.1] transition duration-[0.2s] ${wait && 'animate-fall-down-left'}`} onClick={handlePlayButtonClick}>Play</button>
                    </div>
                ) : (
                    <>
                        <Logo className="animate-bounce-in-left"/>
                        <div className="flex flex-row gap-[4rem]">
                            <GameCard title="Queue Up" className="animate-bounce-up-1"/>
                            <a href="/create-game/ai"><GameCard title="Play AI" className="animate-bounce-up-2"/></a>
                            <a href="/create-game/player"><GameCard title="Create Game" className="animate-bounce-up-3"/></a>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
