import { SyntheticEvent } from "react";

interface Props {
    src: string;
    fallbackSrc: string;
    className?: string;
}

export default function DynamicImage({ src, fallbackSrc, className  }: Props) {
    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = fallbackSrc;
    };

    return (
        <img className={className} src={src} alt="Dynamic Image" onError={handleError} />
    );
};