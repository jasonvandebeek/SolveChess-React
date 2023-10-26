import Player from '../../components/board/player';
import Board from '../../components/board/board';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className='flex flex-col gap-[1rem] w-[80vh]'>
            {/*<div>Game ID: {params.id}</div>*/}

            <Player direction='rtl'/>
            
            <Board side='white'/>

            <Player direction='ltr'/>
        </div>
    )
}