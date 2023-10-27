'use client';

import Square from './square';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';

type Props = {
    fen?: string;
    side: 'white' | 'black';
};

export default function BoardComponent({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white' }:Props) {
    const board = new Board(fen);

    /*const isBlackSide = side === 'black';
    for (let rank = isBlackSide ? 8 : 1; isBlackSide ? rank >= 1 : rank <= 8; isBlackSide ? rank-- : rank++) {
        for (let file = isBlackSide ? 8 : 1; isBlackSide ? file >= 1 : file <= 8; isBlackSide ? file-- : file++) {
            const piece = board.GetPiece(rank, file);
            const hasFileNotation = rank === 1 && side === 'black' || rank === 8 && side === 'white';
            const hasRankNotation = file === 8 && side === 'black' || file === 1 && side === 'white';
            
            board.push(
                <Square key={`${rank};${file}`} file={file} rank={rank} hasFileNotation={hasFileNotation} hasRankNotation={hasRankNotation} piece={piece}/>
            );
        }
    }*/

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
                        ></Square>
                    ))
                ))}
            </div>
        </DndProvider>
    );
}