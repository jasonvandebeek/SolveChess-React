import DynamicImage from "../dynamicImage";

type Props = {
    direction?: 'ltr' | 'rtl';
    username: string;
    imageUrl: string;
    rating: number;
    pieces: string;
    diff: string;
};

export default function PlayerComponent({ direction = 'ltr', username, imageUrl, rating, pieces, diff}:Props) {
    return (
        <div className={`flex items-center gap-x-[1.5rem] text-text ${direction}`}>
            <div className="flex items-center gap-x-[0.5rem]">
                <DynamicImage className="h-[2rem] aspect-[1/1] rounded-sm shadow-small" src={imageUrl} fallbackSrc="/images/defaultProfile.png"/>
                <div className={`flex gap-x-[0.25rem] mt-[1px] ltr`}>
                    <span className='mt-[1px]'>{username}</span>
                    <span className='mt-[1px]'>{`(${rating})`}</span>
                </div>
            </div>
            <div className={`flex gap-x-[0.25rem] mt-[1px] ltr`}>
                <span className='font-chess-icons tracking-[2px]'>{pieces}</span>
                <span className='mt-[1px]'>{diff}</span>
            </div>
        </div>
    )
}