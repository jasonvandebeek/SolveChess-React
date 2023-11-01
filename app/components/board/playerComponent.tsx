import { chess_icons } from '../../layout';

type Props = {
    direction?: 'ltr' | 'rtl';
    username: string;
    rating: number;
    imagePath: string;
};

export default function PlayerComponent({ direction = 'ltr', username, rating, imagePath }:Props) {
    return (
        <div className={`flex items-center gap-x-[1.5rem] ${direction}`}>
            <div className="flex items-center gap-x-[0.5rem]">
                <img className="h-[2rem] aspect-[1/1] rounded-sm shadow-small" src={imagePath}/>
                <div className={`flex gap-x-[0.25rem] mt-[1px] ltr`}>
                    <span className='mt-[1px]'>{username}</span>
                    <span className='mt-[1px]'>{`(${rating})`}</span>
                </div>
            </div>
            <div className={`flex gap-x-[0.25rem] mt-[1px] ltr`}>
                <span className={`${chess_icons.className} tracking-[2px]`}>♟︎♟︎ ♞</span>
                <span className='mt-[1px]'>+1</span>
            </div>
        </div>
    )
}