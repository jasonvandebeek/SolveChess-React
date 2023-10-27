'use client';

import Square from './square';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';
import PieceComponent from './pieceComponent';

type Props = {
    fen?: string;
    side: 'white' | 'black';
};

export default function BoardComponent({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white' }:Props) {
    const board = new Board(fen);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-8 w-[100%] rounded overflow-hidden text-background select-none shadow-normal">
                {board.GetBoardArray().map((rank, rankIndex) => (
                    rank.map((piece, fileIndex) => (
                        <Square 
                            file={fileIndex + 1} 
                            rank={rankIndex + 1} 
                            hasFileNotation={rankIndex === 0 && side === 'black' || rankIndex === 7 && side === 'white'}
                            hasRankNotation={fileIndex === 7 && side === 'black' || fileIndex === 0 && side === 'white'}
                            onDrop={board.MovePiece}
                        >
                            {piece && <PieceComponent piece={piece} board={board}/>}
                        </Square>
                    ))
                ))}
            </div>
        </DndProvider>
    );
}