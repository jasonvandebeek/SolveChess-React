import PieceBase from "./pieces/pieceBase";
import PieceFactory from "./pieces/pieceFactory";
import Square from "./utilities/square";

export default class Board {
    private board: (PieceBase | null)[][] = new Array(8).fill(null).map(() => new Array(8).fill(null));;

    constructor(fen: string) {
        if (!validateFEN(fen)) {
            throw new Error('Invalid FEN!')
        }

        const ranks = fen.split(' ')[0].split('/');

        for (let rank = 0; rank < 8; rank++) {
            let file = 0;
            for (const char of ranks[rank]) {
                if (/[1-8]/.test(char)) {
                    file += parseInt(char);
                } else {
                    const type = char.toLowerCase() as "p" | "r" | "n" | "b" | "q" | "k";
                    const side = char === char.toUpperCase() ? 'white' : 'black';

                    this.board[rank][file] = new PieceFactory().BuildPiece(type, side);
                    file++;
                }
            }
        }
    }

    GetSquareOfPiece(piece: PieceBase) {
        for (let rank = 0; rank < this.board.length; rank++) {
            for (let file = 0; file < this.board[rank].length; file++) {
                if (piece.Equals(this.board[rank][file])) {
                    return new Square(rank, file); 
                }
            }
        }

        throw new Error("Invalid board given with piece!")
    }

    GetPieceAt(square: Square) {
        return this.board[square.Rank][square.File];
    }

    GetBoardArray() {
        return this.board;
    }

    MovePiece(from: Square, to: Square) {
        const piece = this.board[from.Rank][from.File];

        this.board[from.Rank][from.File] = null;
        this.board[to.Rank][to.File] = piece;
    }

    CanPieceMoveTo(piece: PieceBase, target: Square) {
        return piece.CanMoveToSquare(target, this);
    }
}

function validateFEN(fen: string): boolean {
    const fenRegex = /^\s*(((?:[rnbqkpRNBQKP1-8]+\/){7})[rnbqkpRNBQKP1-8]+)(\s([b|w]))?(\s([K|Q|k|q]{1,4}))?(\s(-|[a-h][1-8]))?(\s(\d+\s\d+))?$/;
    
    return fenRegex.test(fen);
}