"use client";

import Logo from '@/components/logo';
import BoardComponent from '@/components/board/boardComponent';
import Side from '@/logic/attributes/Side';
import { useEffect, useState } from 'react';
import GameModel from '@/models/gameModel';
import { getGame } from '@/utils/api';
import { Board } from '@/logic/board';
import { useUser } from '@/components/userContext';

export default function Page({ params }: { params: { id: string } }) {
    const { user } = useUser();

    const [game, setGame] = useState<GameModel>();
    const [playerId, setPlayerId] = useState("");
    const [opponentId, setOpponentId] = useState("");
    const [board, setBoard] = useState<Board>();
    const [side, setSide] = useState<Side>();

    useEffect(() => {
        if(!user)
            return;

        const fetchGame = async () => {
            const game = await getGame(params.id);
            const userIsWhite = user!.userId == game.whiteSideUserId;
            
            setGame(game);
            setPlayerId(user!.userId);
            setOpponentId(userIsWhite ? game.blackSideUserId : game.whiteSideUserId);
            setSide(userIsWhite ? Side.WHITE : Side.BLACK);
            setBoard(new Board(game.fen, game.castlingRightBlackKingSide, game.castlingRightBlackQueenSide, game.castlingRightWhiteKingSide, game.castlingRightWhiteQueenSide, game.enpassantSquare))
        }

        fetchGame();
    }, [user])

    return (
        <>
            <Logo/>
            <div className='flex flex-row w-[100vw] h-[100vh] justify-center items-center'>
                <div className='flex flex-col gap-[1rem] w-[80vh]'>
                    {game && <BoardComponent gameId={params.id} side={side!} initialSideToMove={game.sideToMove} board={board!} playerId={playerId} opponentId={opponentId}/>}
                </div>
            </div>
        </>
    )
}