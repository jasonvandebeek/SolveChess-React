import { useDrop } from "react-dnd";
import Square from '@/logic/utilities/square'

type Props = {
    square: Square;
    hasFileNotation?: boolean;
    hasRankNotation?: boolean;
    children?: React.ReactNode;
    onDrop: (from: Square, to: Square) => void;
    className?: string;
    canMove: (from: Square, to: Square) => boolean;
};

export default function SquareComponent({ square, hasFileNotation = false, hasRankNotation = false, children, onDrop, className, canMove}:Props) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "piece",
        drop: (pieceSquare: Square) => onDrop(pieceSquare, square),
        canDrop: ( pieceSquare: Square, monitor) => canMove(pieceSquare, square),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    const bgColor = (square.rank + square.file) % 2 === 0 ? 'bg-white' : 'bg-highlight'

    const rankNotation = 8 - square.rank;
    const fileNotation = String.fromCharCode(65 + square.file);

    return (
        <div id={`${fileNotation}${rankNotation}`} ref={drop} className={`relative ${bgColor} aspect-[1/1] flex justify-center items-center ${className}`}>
            {hasRankNotation && <span key={`rank-${square.rank}`} className='font-bold absolute top-[3px] left-[3px] leading-[1]'>{rankNotation}</span>}
            {hasFileNotation && <span key={`file-${square.file}`} className='font-bold absolute bottom-0 right-[4px] leading-[1]'>{fileNotation}</span>}
            {children}
            {(canDrop && children == undefined) && (
                <div className="w-[30%] h-[30%] rounded-[100vw] bg-container bg-opacity-40"></div>
            )}
            {(canDrop && children != undefined) && (
                <div className="absolute w-[90%] h-[90%] rounded-[100vw] border-solid border-container border-opacity-40 border-[0.5rem]"></div>
            )}
            {isOver && (
                <div className="absolute w-[100%] h-[100%] box-border border-solid border-container border-opacity-40 border-[0.5rem]"></div>
            )}
        </div>
    );
}