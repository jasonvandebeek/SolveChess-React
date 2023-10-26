import './board.css';
import { DragPreviewImage, useDrag } from "react-dnd"; 

type Props = {
    id: string;
    piece?: string;
}

export default function Piece({ id, piece }:Props) {
    const [, drag] = useDrag(() => ({
        type: "piece",
        item: { id }
    }));

    return (
        <div ref={drag} id={id} className={`piece ${piece} h-[70%] aspect-[1/1]`}/>
    );
}