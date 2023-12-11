import { ReactNode } from "react";

interface Props {
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
}

export default function Button({ className, children, onClick }:Props) {

    return (
        <button className={
            `bg-highlight 
            font-bold 
            text-text 
            py-[0.75rem] 
            px-[1.5rem] 
            rounded-[0.25rem] 
            hover:scale-[1.1] 
            transition 
            duration-[0.2s] 
            leading-none 
            disabled:bg-tone-down
            ${className}`
        } 
        onClick={onClick}>
            {children}
        </button>
    )

}