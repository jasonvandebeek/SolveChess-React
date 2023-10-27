import { useDrop } from "react-dnd";

type Props = {
    file: number;
    rank: number;
    hasFileNotation?: boolean;
    hasRankNotation?: boolean;
    children?: React.ReactNode;
    onMove: (fromRank: number, fromFile: number, toRank: number, toFile: number) => void;
};

export default function Square({ file, rank, hasFileNotation = false, hasRankNotation = false, children, onMove}:Props) {
    if (file < 0 || file > 7 || rank < 0 || rank > 7) {
        throw new Error("Coordinates are out of bounds!");
    }

    const id = `${rank};${file}`;

    const [, drop] = useDrop(() => ({
        accept: "piece",
        drop: (item: { rank: number, file: number }) => onMove(item.rank, item.file, rank, file)
    }));
    
    const info = [];

    if (hasRankNotation) {
        const rankText = 8 - rank;
        info.push(<span key={`rank-${rank}`} className='font-bold absolute top-[3px] left-[3px] leading-[1]'>{rankText}</span>);
    }

    if (hasFileNotation) {
        const fileText = String.fromCharCode(65 + file);
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