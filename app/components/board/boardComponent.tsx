'use client';

import SquareComponent from './squareComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';
import PieceComponent from './pieceComponent';
import { useState } from 'react';
import Square from './logic/utilities/square';

type Props = {
    fen?: string;
    side: 'white' | 'black';
};

export default function BoardComponent({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white' }:Props) {
    const [board, SetBoard] = useState(new Board(fen).GetBoardArray());

    const MovePiece = (from: Square, to: Square) => {
        if(!CanMove(from, to))
            return;

        const newBoard = [...board]
        const piece = newBoard[from.Rank][from.File];

        newBoard[from.Rank][from.File] = null;
        newBoard[to.Rank][to.File] = piece;
        
        SetBoard(newBoard);
    }

    const CanMove = (from: Square, to: Square) => {
        const piece = board[from.Rank][from.File];
        if(piece === null)
            return false;

        const moves = piece.GetMoves(board);
        const coord = [to.Rank, to.File];

        let isCoordInMoves = false;
        for (const move of moves) {
            if (move[0] === coord[0] && move[1] === coord[1]) {
                isCoordInMoves = true;
                break;
            }
        }

        return isCoordInMoves;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`flex ${side === 'white' ? "flex-wrap" : "flex-wrap-reverse"} w-[100%] rounded overflow-hidden text-background select-none shadow-normal`}>
                {board.map((rank, rankIndex) => (
                    <div key={`rank-${rankIndex}`} className={`flex w-[100%] ${side === 'white' ? "flex-row" : "flex-row-reverse"}`}>
                        {rank.map((piece, fileIndex) => (
                            <SquareComponent 
                                square={new Square(rankIndex, fileIndex)}
                                hasFileNotation={rankIndex === 0 && side === 'black' || rankIndex === 7 && side === 'white'}
                                hasRankNotation={fileIndex === 7 && side === 'black' || fileIndex === 0 && side === 'white'}
                                onDrop={MovePiece}
                                className='w-[calc(100%/8)]'
                                key={`square-${rankIndex}-${fileIndex}`}
                                canMove={CanMove}
                            >
                                {piece && <PieceComponent piece={piece} board={board} canDrag={piece.GetSide() === side}/>}
                            </SquareComponent>
                        ))}
                    </div>
                ))}
            </div>
        </DndProvider>
    );
}