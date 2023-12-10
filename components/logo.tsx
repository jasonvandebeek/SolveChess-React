
type Props = {
    className?: string;
}

export default function Logo({ className }:Props) {
    return (
        <span className={`absolute text-text left-[3rem] top-[2rem] font-montserrat-alt font-extrabold text-[1.75rem] select-none drop-shadow ${className}`}>SOLVECHESS.AI</span>
    )
}