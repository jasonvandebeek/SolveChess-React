"use client"

import { ReactNode } from "react";

interface Props {
    color: 'WHITE' | 'BLACK' | 'RANDOM';
    isSelected: boolean;
    className?: string;
    children?: ReactNode;
    onClick?: (color: 'WHITE' | 'BLACK' | 'RANDOM') => void;
}

export default function ColorSelector({ color, isSelected, className, children, onClick = () => {}, }:Props) {
    return (
        <div className={
            `relative 
            text-[3rem] 
            w-[4.5rem] 
            aspect-[1/1] 
            rounded-[0.25rem] 
            shadow-small 
            hover:scale-[1.1] 
            transition 
            duration-[0.2s] 
            cursor-pointer 
            justify-center 
            text-center 
            ${isSelected ? "text-highlight" : "text-text-alt "}
            ${className}`}
        onClick={() => { onClick(color) }}>
            {children}
        </div>
    )
}