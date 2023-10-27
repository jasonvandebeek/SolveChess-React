import { useDrop } from "react-dnd";
import Piece from './pieceComponent';

type Props = {
    file: number;
    rank: number;
    hasFileNotation?: boolean;
    hasRankNotation?: boolean;
    children?: React.ReactNode;
    onDrop: (fromRank: number, fromFile: number, toRank: number, toFile: number) => void;
};

export default function Square({ file, rank, hasFileNotation = false, hasRankNotation = false, children, onDrop}:Props) {
    if (file < 1 || file > 8 || rank < 1 || rank > 8) {
        throw new Error("Coordinates are out of bounds!");
    }

    const id = `${rank};${file}`;

    const [, drop] = useDrop(() => ({
        accept: "piece",
        drop: (item: { rank: number, file: number }) => onDrop(item.rank, item.file, rank, file)
        
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
            {children}
        </div>
    );
}