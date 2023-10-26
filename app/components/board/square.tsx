import { useDrop } from "react-dnd";
import Piece from './piece';

type Props = {
    file: number;
    rank: number;
    hasFileNotation?: boolean;
    hasRankNotation?: boolean;
    piece?: string;
};

interface Item {
    id: string; 
}

export default function Square({ file, rank, hasFileNotation = false, hasRankNotation = false, piece }:Props) {
    if (file < 1 || file > 8 || rank < 1 || rank > 8) {
        throw new Error("Coordinates are out of bounds!");
    }

    const id = `${rank};${file}`;

    const [, drop] = useDrop(() => ({
        accept: "piece",
        drop: (item: Item) => {
            const squareElement = document.getElementById(id) as HTMLElement;
            const pieceElement = document.getElementById(item.id);
            if (pieceElement) {
                squareElement.appendChild(pieceElement);
            }
        }
    }));
    
    const info = [];

    if (hasRankNotation) {
        const rankText = 9 - rank;
        info.push(<span key={`rank-${rank}`} className='font-bold absolute top-[3px] left-[3px] leading-[1]'>{rankText}</span>);
    }

    if (hasFileNotation) {
        const fileText = String.fromCharCode(64 + file);
        info.push(<span key={`file-${file}`} className='font-bold absolute bottom-0 right-[4px] leading-[1]'>{fileText}</span>);
    }

    const bgColor = (rank + file) % 2 === 0 ? 'bg-white' : 'bg-highlight'
    return (
        <div id={id} ref={drop} className={`relative ${bgColor} aspect-[1/1] flex justify-center items-center`} data-rank={rank} data-file={file}>
            {info}
            {piece !== null ? <Piece id={`${piece}-${rank};${file}`} piece={piece}/> : null}
        </div>
    );
}