import BoardComponent from '../../components/board/boardComponent';
import PlayerComponent from '../../components/board/playerComponent';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className='flex flex-col gap-[1rem] w-[80vh]'>
            <PlayerComponent direction='rtl' username='Username' rating={690} imagePath='/images/Edward_2x.png'/>
            
            <BoardComponent side='white' sideToMove='white'/>

            <PlayerComponent direction='ltr' username='Username' rating={203} imagePath='/images/Edward_2x.png'/>
        </div>
    )
}