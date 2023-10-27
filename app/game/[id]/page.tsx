import Player from '../../components/board/player';
import BoardComponent from '../../components/board/boardComponent';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className='flex flex-col gap-[1rem] w-[80vh]'>
            {/*<div>Game ID: {params.id}</div>*/}

            <Player direction='rtl'/>
            
            <BoardComponent side='white'/>

            <Player direction='ltr'/>
        </div>
    )
}