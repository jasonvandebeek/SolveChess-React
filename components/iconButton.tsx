import { ReactNode } from "react";

interface Props {
    icon: string;
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
}

export default function IconButton({ icon, onClick, className, children }:Props) {
    return (
        <button className={`group relative shadow-small rounded-[0.125rem] px-[0.5em] inline-flex items-center justify-center gap-[0.5em] ${className}`} onClick={onClick}>
            <div className="absolute inset-0 transition duration-[0.3s] group-hover:scale-[1.15] group-hover:shadow-normal bg-inherit rounded-[0.125rem]"></div>
            <i className={`relative flex py-[0.5em] ${icon}`}/>
            {children && <div className="relative">{children}</div>}
        </button>
    );
}