'use client';

import Square from './square';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Props = {
    fen?: string;
    side: 'white' | 'black';
};

export default function Board({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white' }:Props) {
    const isFENValid = validateFEN(fen);
    if (!isFENValid) {
        return <div>Error: Invalid FEN given!</div>;
    }
    
    const fenArray = FenToArray(fen);
    const board = [];
    const isBlackSide = side === 'black';

    for (let rank = isBlackSide ? 8 : 1; isBlackSide ? rank >= 1 : rank <= 8; isBlackSide ? rank-- : rank++) {
        for (let file = isBlackSide ? 8 : 1; isBlackSide ? file >= 1 : file <= 8; isBlackSide ? file-- : file++) {
            const piece = fenArray[rank - 1][file - 1];
            const hasFileNotation = rank === 1 && side === 'black' || rank === 8 && side === 'white';
            const hasRankNotation = file === 8 && side === 'black' || file === 1 && side === 'white';
            
            board.push(
                <Square key={`${rank};${file}`} file={file} rank={rank} hasFileNotation={hasFileNotation} hasRankNotation={hasRankNotation} piece={piece}/>
            );
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-8 w-[100%] rounded overflow-hidden text-background select-none shadow-normal">
                {board}
            </div>
        </DndProvider>
    );
}

function FenToArray(fen: string) {
    const ranks = fen.split(' ')[0].split('/');

    const board = new Array(8).fill(null).map(() => new Array(8).fill(null));

    for (let rank = 0; rank < 8; rank++) {
        let file = 0;
        for (const char of ranks[rank]) {
            if (/[1-8]/.test(char)) {
                file += parseInt(char);
            } else {
                board[rank][file] = char;
                file++;
            }
        }
    }

    return board;
}

function validateFEN(fen: string): boolean {
    const fenRegex = /^\s*(((?:[rnbqkpRNBQKP1-8]+\/){7})[rnbqkpRNBQKP1-8]+)(\s([b|w]))?(\s([K|Q|k|q]{1,4}))?(\s(-|[a-h][1-8]))?(\s(\d+\s\d+))?$/;
    
    return fenRegex.test(fen);
}
