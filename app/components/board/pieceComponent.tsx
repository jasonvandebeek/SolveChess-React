import './board.css';
import { useDrag } from "react-dnd"; 
import PieceBase from './logic/pieces/pieceBase';

type Props = {
    piece: PieceBase;
    board: (PieceBase | null)[][];
    canDrag: boolean;
}

export default function PieceComponent({ piece, board, canDrag }:Props) {
    const square = piece.FindSelf(board);

    const [, drag] = useDrag(() => ({
        type: "piece",
        item: square
    }));

    return (
        <div ref={canDrag ? drag : null} className={`piece ${piece.GetType()} ${piece.GetSide()} h-[70%] aspect-[1/1]`}/>
    );
}