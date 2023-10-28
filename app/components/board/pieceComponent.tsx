import './board.css';
import { useDrag } from "react-dnd"; 
import Square from './logic/utilities/square';

type Props = {
    type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    side: "white" | "black";
    square: Square;
    canDrag: boolean;
}

export default function PieceComponent({ type, side, square, canDrag }:Props) {
    const [, drag] = useDrag(() => ({
        type: "piece",
        item: square
    }));

    return (
        <div ref={canDrag ? drag : null} className={`piece ${type} ${side} h-[70%] aspect-[1/1]`}/>
    );
}