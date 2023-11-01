'use client';

import SquareComponent from './squareComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';
import PieceComponent from './pieceComponent';
import { useState } from 'react';
import Square from './logic/utilities/square';
import Side from './logic/types/Side';

type Props = {
    fen?: string;
    side: Side;
    sideToMove: Side;
};

export default function BoardComponent({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white', sideToMove}:Props) {
    const board = new Board(fen);

    const [boardArray, setBoardArray] = useState(board.GetBoardArray());
    const [_sideToMove, setSideToMove] = useState(sideToMove);

    const MovePiece = (from: Square, to: Square) => {
        if(!CanMove(from, to))
            return;

        board.MovePiece(from, to);
        const newBoardArray = board.GetBoardArray();
        setBoardArray([...newBoardArray]);
        //setSideToMove('white' == _sideToMove ? 'black' : 'white');
    }

    const CanMove = (from: Square, to: Square) => {
        const piece = board.GetPieceAt(from);
        if(piece === null)
            return false;
        
        return board.CanPieceMoveTo(piece, to);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`flex ${side === 'white' ? "flex-wrap" : "flex-wrap-reverse"} w-[100%] rounded overflow-hidden text-background select-none shadow-normal`}>
                {boardArray.map((rank, rankIndex) => (
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
                                {piece && <PieceComponent type={piece.Type} side={piece.Side} square={new Square(rankIndex, fileIndex)} canDrag={piece.Side === side && _sideToMove === side}/>}
                            </SquareComponent>
                        ))}
                    </div>
                ))}
            </div>
        </DndProvider>
    );
}