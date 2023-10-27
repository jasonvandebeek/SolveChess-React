'use client';

import Square from './square';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';
import PieceComponent from './pieceComponent';
import { useState } from 'react';
import PieceBase from './logic/pieces/pieceBase';

type Props = {
    fen?: string;
    side: 'white' | 'black';
};

export default function BoardComponent({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white' }:Props) {
    const [board, SetBoard] = useState(new Board(fen).GetBoardArray());

    const MovePiece = (fromRank: number, fromFile: number, toRank: number, toFile: number) => {
        const newBoard = [...board]
        const piece = newBoard[fromRank][fromFile];

        newBoard[toRank][toFile] = piece;
        newBoard[fromRank][fromFile] = null;

        SetBoard(newBoard);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-8 w-[100%] rounded overflow-hidden text-background select-none shadow-normal">
                {board.map((rank, rankIndex) => (
                    rank.map((piece, fileIndex) => (
                        <Square 
                            file={fileIndex} 
                            rank={rankIndex} 
                            hasFileNotation={rankIndex === 0 && side === 'black' || rankIndex === 7 && side === 'white'}
                            hasRankNotation={fileIndex === 7 && side === 'black' || fileIndex === 0 && side === 'white'}
                            onMove={MovePiece}
                        >
                            {piece && <PieceComponent piece={piece} board={board}/>}
                        </Square>
                    ))
                ))}
            </div>
        </DndProvider>
    );
}