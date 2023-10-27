import './board.css';
import { useDrag } from "react-dnd"; 
import PieceBase from './logic/pieces/pieceBase';
import Board from './logic/board';

type Props = {
    piece: PieceBase;
    board: (PieceBase | null)[][];
}

export default function PieceComponent({ piece, board }:Props) {
    const FindSelf = (piece: PieceBase) => {
        for (let rank = 0; rank < board.length; rank++) {
            for (let file = 0; file < board[rank].length; file++) {
                if (board[rank][file] === piece) {
                    return [rank, file]; 
                }
            }
        }
    }
    const [rank, file]: any = FindSelf(piece);

    const [, drag] = useDrag(() => ({
        type: "piece",
        item: { rank, file }
    }));

    

    return (
        <div ref={drag} className={`piece ${piece.GetType()} ${piece.GetSide()} h-[70%] aspect-[1/1]`}/>
    );
}