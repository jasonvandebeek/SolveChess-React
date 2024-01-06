import './board.css';
import { useDrag } from "react-dnd"; 
import Square from '@/logic/utilities/square';
import Side from '@/logic/attributes/Side';
import PieceType from '@/logic/attributes/PieceType';

type Props = {
    type: PieceType;
    side: Side;
    square: Square;
    canDrag: boolean;
}

export default function PieceComponent({ type, side, square, canDrag }:Props) {
    const [, drag] = useDrag(() => ({
        type: "piece",
        item: square
    }));

    return (
        <div ref={canDrag ? drag : null} className={`piece ${type.toString().toLowerCase()} ${side.toString().toLowerCase()} h-[70%] aspect-[1/1]`}/>
    );
}