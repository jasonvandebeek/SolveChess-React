'use client';

import SquareComponent from './squareComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './logic/board';
import PieceComponent from './pieceComponent';
import { useEffect, useState } from 'react';
import Square from './logic/utilities/square';
import Side from './logic/types/Side';
import PlayerComponent from './playerComponent';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';

type Props = {
    gameId: string;
    fen?: string;
    side: Side;
    sideToMove: Side;
};

export default function BoardComponent({ gameId, fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', side = 'white', sideToMove }: Props) {
    const board = new Board(fen);
    const [boardArray, setBoardArray] = useState(board.GetBoardArray());

    const [_sideToMove, setSideToMove] = useState(sideToMove);

    useEffect(() => {
        const Connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7001/api/websocket')
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();
    
        Connection.start().then(() => {
            Connection.invoke("JoinGame", gameId);

            Connection.on("ReceiveMove", move => {
                console.log('recieve');
    
                var from = new Square(move.from.rank, move.from.file);
                var to = new Square(move.to.rank, move.to.file);
    
                board.MovePiece(from, to);
                const newBoardArray = board.GetBoardArray();
                setBoardArray([...newBoardArray]);
    
                //setSideToMove('white' == _sideToMove ? 'black' : 'white');
            });
    
        });
    }, []);

    const MovePiece = (from: Square, to: Square) => {
        if (!CanMove(from, to))
            return;

        console.log('move');

        const url = `https://localhost:7011/api/Chess/MakeMove?gameId=${gameId}`;
        const data = { 
            from: { 
                rank: from.Rank, 
                file: from.File 
            }, 
            to: { 
                rank: to.Rank, 
                file: to.File 
            } 
        };

        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const CanMove = (from: Square, to: Square) => {
        const piece = board.GetPieceAt(from);
        if (piece === null)
            return false;

        return board.CanPieceMoveTo(piece, to);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <PlayerComponent direction='rtl' username='Username' imageUrl='/' rating={100} pieces='♟︎♟︎ ♞' diff='' />

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
                                {piece && <PieceComponent type={piece.Type} side={piece.Side} square={new Square(rankIndex, fileIndex)} canDrag={piece.Side === side && _sideToMove === side} />}
                            </SquareComponent>
                        ))}
                    </div>
                ))}
            </div>

            <PlayerComponent direction='ltr' username='Username' imageUrl='/' rating={100} pieces='♟︎♟︎ ♞' diff='+1' />
        </DndProvider>
    );
}