'use client'

import Notification from "./notification"
import Button from "./button";
import Link from "next/link";
import { useUser } from "./userContext";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/utils/api";
import DynamicImage from "./dynamicImage";

export default function Account() {
    const { user } = useUser();
    const [menuOpened, setMenuOpened] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpened && accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setMenuOpened(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpened]);
    
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch(exception) {
            //handle exception
        }
    }

    return (
        <div className="flex flex-row gap-[1.5rem] items-center text-[rem] text-text select-none absolute top-[2rem] right-[3rem]">
            {user === null ? (
                <>
                    <a href="/login"><span className="cursor-pointer">Login</span></a>
                    <a href="/signup"><Button>Sign Up</Button></a>
                </>
            ) : (
                <>
                    <div className="flex flex-row gap-[1rem] items-center">
                        <Link href="/friendlist"><i className="text-[1.25rem] fi fi-sr-users text-text flex items-center cursor-pointer"/></Link>
                        <Notification/>
                    </div>
                    <div className="flex flex-row gap-[1rem] items-center cursor-pointer text-text" onClick={() => setMenuOpened(!menuOpened)}>
                        <span>{user.username}</span>
                        <DynamicImage src={user.profilePictureUrl} fallbackSrc="/images/defaultProfile.png" className="h-[2.5rem] rounded-[0.25rem] aspect-[1/1] shadow-small bg-container"/>
                    </div>
                    {menuOpened && (
                        <div ref={accountMenuRef} className="account-menu absolute top-[calc(100%+0.5rem)] right-0 bg-container rounded-[0.25rem] shadow-small flex flex-col overflow-hidden">
                            <Link href="/settings">
                                <div className="flex flex-row justify-center gap-[0.5rem] w-[100%] hover:bg-highlight px-[0.75rem] py-[0.5rem] transition duration-[0.3s] cursor-pointer">
                                    <i className="relative flex items-center fi fi-sr-settings"/>
                                    <span>Settings</span>
                                </div>
                            </Link>
                            <div className="flex flex-row justify-center gap-[0.5rem] w-[100%] hover:bg-highlight px-[0.75rem] py-[0.5rem] transition duration-[0.3s] cursor-pointer" onClick={handleLogout}>
                                <i className="relative flex items-center fi fi-bs-sign-out-alt"/>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}