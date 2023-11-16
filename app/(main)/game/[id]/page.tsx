import Logo from '@/app/components/logo';
import BoardComponent from '@/app/components/board/boardComponent';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <Logo/>
            <div className='flex flex-row w-[100vw] h-[100vh] justify-center items-center'>
                <div className='flex flex-col gap-[1rem] w-[80vh]'>
                    <BoardComponent gameId={params.id} side='white' sideToMove='white'/>
                </div>
            </div>
        </>
    )
}