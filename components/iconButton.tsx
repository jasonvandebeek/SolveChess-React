import { ReactNode } from "react";

interface Props {
    icon: string;
    className?: string;
    children?: ReactNode;
}

export default function IconButton({ icon, className, children }:Props) {
    return (
        <button className={`rounded-[0.125rem] shadow-small px-[0.5em] transition duration-[0.3s] hover:scale-[1.15] hover:shadow-normal flex flex-row items-center gap-[0.5em] ${className}`}>
            <i className={`flex justify-center py-[0.5em] ${icon}`}/>
            {children}
        </button>
    );
}