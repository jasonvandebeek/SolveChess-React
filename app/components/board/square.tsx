import { useDrop } from "react-dnd";

type Props = {
    file: number;
    rank: number;
    hasFileNotation?: boolean;
    hasRankNotation?: boolean;
    children?: React.ReactNode;
    onMove: (fromRank: number, fromFile: number, toRank: number, toFile: number) => void;
    className?: string;
};

export default function Square({ file, rank, hasFileNotation = false, hasRankNotation = false, children, onMove, className}:Props) {
    if (file < 0 || file > 7 || rank < 0 || rank > 7) {
        throw new Error("Coordinates are out of bounds!");
    }

    const id = `${rank};${file}`;

    const [, drop] = useDrop(() => ({
        accept: "piece",
        drop: (item: { rank: number, file: number }) => onMove(item.rank, item.file, rank, file)
    }));

    const bgColor = (rank + file) % 2 === 0 ? 'bg-white' : 'bg-highlight'
    return (
        <div ref={drop} className={`relative ${bgColor} aspect-[1/1] flex justify-center items-center ${className}`} data-rank={rank} data-file={file}>
            {hasRankNotation && <span key={`rank-${rank}`} className='font-bold absolute top-[3px] left-[3px] leading-[1]'>{8 - rank}</span>}
            {hasFileNotation && <span key={`file-${file}`} className='font-bold absolute bottom-0 right-[4px] leading-[1]'>{String.fromCharCode(65 + file)}</span>}
            {children}
        </div>
    );
}