import { useDrop } from "react-dnd";
import Square from './logic/utilities/square'

type Props = {
    square: Square;
    hasFileNotation?: boolean;
    hasRankNotation?: boolean;
    children?: React.ReactNode;
    onDrop: (from: Square, to: Square) => void;
    className?: string;
    canMove: (from: Square, to: Square) => boolean;
};

export default function squareComponent({ square, hasFileNotation = false, hasRankNotation = false, children, onDrop, className, canMove}:Props) {
    const [, drop] = useDrop(() => ({
        accept: "piece",
        drop: (piece: Square) => onDrop(piece, square),
        canDrop: ( piece: Square, monitor) => canMove(piece, square)
    }));

    const bgColor = (square.Rank + square.File) % 2 === 0 ? 'bg-white' : 'bg-highlight'
    return (
        <div ref={drop} className={`relative ${bgColor} aspect-[1/1] flex justify-center items-center ${className}`}>
            {hasRankNotation && <span key={`rank-${square.Rank}`} className='font-bold absolute top-[3px] left-[3px] leading-[1]'>{8 - square.Rank}</span>}
            {hasFileNotation && <span key={`file-${square.File}`} className='font-bold absolute bottom-0 right-[4px] leading-[1]'>{String.fromCharCode(65 + square.File)}</span>}
            {children}
        </div>
    );
}