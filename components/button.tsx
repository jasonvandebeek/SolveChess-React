import { ReactNode } from "react";

interface Props {
    id?: string;
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export default function Button({ id, className, children, onClick, disabled = false }:Props) {

    return (
        <button className={
            `font-bold 
            text-text 
            py-[0.75rem] 
            px-[1.5rem] 
            rounded-[0.25rem] 
            hover:scale-[1.15] 
            transition 
            duration-[0.3s] 
            leading-none 
            disabled:bg-tone-down
            ${className}`
        } 
        id={id}
        disabled={disabled}
        onClick={onClick}>
            {children}
        </button>
    )

}