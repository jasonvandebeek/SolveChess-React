'use client';

import Square from './square';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';
import PieceComponent from './pieceComponent';
import { useState } from 'react';

type Props = {
    fen?: string;
    side: 'white' | 'black';
};

export default function BoardComponent({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white' }:Props) {
    const [board, SetBoard] = useState(new Board(fen).GetBoardArray());

    const MovePiece = (fromRank: number, fromFile: number, toRank: number, toFile: number) => {
        const newBoard = [...board]
        const piece = newBoard[fromRank][fromFile];

        newBoard[fromRank][fromFile] = null;
        newBoard[toRank][toFile] = piece;
        
        SetBoard(newBoard);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`flex ${side === 'white' ? "flex-wrap" : "flex-wrap-reverse"} w-[100%] rounded overflow-hidden text-background select-none shadow-normal`}>
                {board.map((rank, rankIndex) => (
                    <div key={`rank-${rankIndex}`} className={`flex w-[100%] ${side === 'white' ? "flex-row" : "flex-row-reverse"}`}>
                        {rank.map((piece, fileIndex) => (
                            <Square 
                                file={fileIndex} 
                                rank={rankIndex} 
                                hasFileNotation={rankIndex === 0 && side === 'black' || rankIndex === 7 && side === 'white'}
                                hasRankNotation={fileIndex === 7 && side === 'black' || fileIndex === 0 && side === 'white'}
                                onMove={MovePiece}
                                className='w-[calc(100%/8)]'
                                key={`square-${rankIndex}-${fileIndex}`}
                            >
                                {piece && <PieceComponent piece={piece} board={board} canDrag={piece.GetSide() === side}/>}
                            </Square>
                        ))}
                    </div>
                ))}
            </div>
        </DndProvider>
    );
}