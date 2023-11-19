
interface Props {
    title: string;
    className?: string;
}

export default function GameCard({ title, className }:Props) {
    return (
        <div className={`w-[17rem] shadow-small aspect-[1/1.8] bg-container hover:bg-highlight transition duration-[0.4s] rounded-[0.5rem] hover:scale-[1.1] hover:shadow-normal cursor-pointer flex flex-col items-center justify-end ${className}`}>
            <img src="/images/temp-animation.png" className="w-[100%] aspect-[1/1] my-auto"/>
            <span className="mb-[2rem] text-text font-bold text-[1.75rem]">{title}</span>
        </div>
    )
}