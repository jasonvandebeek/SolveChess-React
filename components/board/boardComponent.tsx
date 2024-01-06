'use client';

import SquareComponent from './squareComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from '@/logic/board';
import PieceComponent from './pieceComponent';
import { useEffect, useState } from 'react';
import Square from '@/logic/utilities/square';
import Side from '@/logic/attributes/Side';
import PlayerComponent from './playerComponent';
import { playMove } from '@/utils/api';
import { getConnection } from '@/utils/websocket';
import UserModel from '@/models/userModel';
import { getUserDataWithId } from '@/utils/userDataApi';

type Props = {
    gameId: string;
    board: Board;
    playerId: string;
    opponentId: string;
    side: Side;
    initialSideToMove: Side;
}

export default function BoardComponent({ gameId, board, playerId, opponentId, side, initialSideToMove }: Props) {
    const [player, setPlayer] = useState<UserModel>();
    const [opponent, setOpponent] = useState<UserModel>();
    const [boardArray, setBoardArray] = useState(board.boardArray);
    const [sideToMove, setSideToMove] = useState(initialSideToMove);

    useEffect(() => {
        const fetchPlayerData = async () => {
            setPlayer(await getUserDataWithId(playerId));
            setOpponent(await getUserDataWithId(opponentId));
        }

        fetchPlayerData();
    }, [playerId, opponentId]);

    useEffect(() => {
        const connection = getConnection();
    
        connection.start().then(() => {
            connection.invoke("JoinGame", gameId);

            connection.on("ReceiveMove", move => {
                console.log(move);

                var from = new Square(move.from.rank, move.from.file);
                var to = new Square(move.to.rank, move.to.file);
    
                board.movePiece(from, to);
                const newBoardArray = board.boardArray;
                setBoardArray([...newBoardArray]);

                setSideToMove(move.side === "WHITE" ? Side.BLACK : Side.WHITE);
            });
        });
    }, []);

    const MovePiece = (from: Square, to: Square) => {
        if (!CanMove(from, to))
            return;

        playMove(gameId, from, to);
    }

    const CanMove = (from: Square, to: Square) => {
        const piece = board.getPieceAt(from);
        if (piece === null)
            return false;

        return piece.canMoveToSquare(to, board);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {opponent && <PlayerComponent direction='rtl' username={opponent.username} imageUrl={opponent.profilePictureUrl} rating={opponent.rating} pieces='' diff=''/>}

            <div className={`flex ${side === Side.WHITE ? "flex-wrap" : "flex-wrap-reverse"} w-[100%] rounded overflow-hidden text-background select-none shadow-normal`}>
                {boardArray.map((rank, rankIndex) => (
                    <div key={`rank-${rankIndex}`} className={`flex w-[100%] ${Side.WHITE ? "flex-row" : "flex-row-reverse"}`}>
                        {rank.map((piece, fileIndex) => (
                            <SquareComponent
                                square={new Square(rankIndex, fileIndex)}
                                hasFileNotation={rankIndex === 0 && side === Side.BLACK || rankIndex === 7 && side === Side.WHITE}
                                hasRankNotation={fileIndex === 0}
                                onDrop={MovePiece}
                                className='w-[calc(100%/8)]'
                                key={`square-${rankIndex}-${fileIndex}`}
                                canMove={CanMove}
                            >
                                {piece && <PieceComponent type={piece.type} side={piece.side} square={new Square(rankIndex, fileIndex)} canDrag={piece.side === side && sideToMove === side} />}
                            </SquareComponent>
                        ))}
                    </div>
                ))}
            </div>

            {player && <PlayerComponent direction='ltr' username={player.username} imageUrl={player.profilePictureUrl} rating={player.rating} pieces='' diff=''/>}
        </DndProvider>
    );
}