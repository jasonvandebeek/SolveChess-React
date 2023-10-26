import { chess_icons } from '../../layout';

type Props = {
    direction?: 'ltr' | 'rtl';
};

export default function Player({ direction = 'ltr' }:Props) {
    return (
        <div className={`flex items-center gap-x-[1.5rem] ${direction}`}>
            <div className="flex items-center gap-x-[0.5rem]">
                <img className="h-[2rem] aspect-[1/1] rounded-sm shadow-small" src="/images/Edward_2x.png"/>
                <div className={`flex gap-x-[0.25rem] mt-[1px] ltr`}>
                    <span className='mt-[1px]'>Username</span>
                    <span className='mt-[1px]'>(306)</span>
                </div>
            </div>
            <div className={`flex gap-x-[0.25rem] mt-[1px] ltr`}>
                <span className={`${chess_icons.className} tracking-[2px]`}>♟︎♟︎ ♞</span>
                <span className='mt-[1px]'>+1</span>
            </div>
        </div>
    )
}