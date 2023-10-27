import './board.css';
import { useDrag } from "react-dnd"; 
import PieceBase from './logic/pieces/pieceBase';
import Board from './logic/board';

type Props = {
    piece: PieceBase;
    board: Board;
}

export default function PieceComponent({ piece, board }:Props) {
    const [rank, file]: any = board.GetPieceLocation(piece);

    const [, drag] = useDrag(() => ({
        type: "piece",
        item: { rank, file }
    }));

    return (
        <div ref={drag} className={`piece ${piece.GetType()} ${piece.GetSide()} h-[70%] aspect-[1/1]`}/>
    );
}