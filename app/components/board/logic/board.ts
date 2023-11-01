import PieceBase from "./pieces/pieceBase";
import PieceFactory from "./pieces/pieceFactory";
import Side from "./types/Side";
import Square from "./utilities/square";

export default class Board {

    protected board: (PieceBase | null)[][] = new Array(8).fill(null).map(() => new Array(8).fill(null));;

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

    GetSquareOfPiece(piece: PieceBase): Square {
        for (let rank = 0; rank < this.board.length; rank++) {
            for (let file = 0; file < this.board[rank].length; file++) {
                if (piece.Equals(this.board[rank][file])) {
                    return new Square(rank, file); 
                }
            }
        }

        throw new Error("Invalid board given with piece!")
    }

    GetPieceAt(square: Square): (PieceBase | null) {
        return this.board[square.Rank][square.File];
    }

    GetBoardArray(): (PieceBase | null)[][] {
        return this.board;
    }

    MovePiece(from: Square, to: Square): void {
        const piece = this.board[from.Rank][from.File];

        this.board[from.Rank][from.File] = null;
        this.board[to.Rank][to.File] = piece;
    }

    CanPieceMoveTo(piece: PieceBase, target: Square): boolean {
        return piece.CanMoveToSquare(target, this);
    }

    KingInCheck(side: Side): boolean {
        const kingSquare = this.FindKing(side);

        for(let rank = 0; rank < this.board.length; rank++) {
            for(let file = 0; file < this.board[rank].length; file++) {
                const piece = this.board[rank][file];

                if(piece == null || piece.Side === side)
                    continue;

                const moves = piece.GetPossibleMoves(this, true);
                for (const move of moves) {
                    if (kingSquare.Equals(move)) 
                        return true;
                }
            };
        };

        return false;
    }

    FindKing(side: Side): Square {
        for(let rank = 0; rank < this.board.length; rank++) {
            for(let file = 0; file < this.board[rank].length; file++) {
                const piece = this.board[rank][file];

                if(piece == null || piece.Type !== 'king' || piece.Side !== side)
                    continue;

                return new Square(rank, file);
            }
        }

        throw new Error('No king found!');
    }
}

function validateFEN(fen: string): boolean {
    const fenRegex = /^\s*(((?:[rnbqkpRNBQKP1-8]+\/){7})[rnbqkpRNBQKP1-8]+)(\s([b|w]))?(\s([K|Q|k|q]{1,4}))?(\s(-|[a-h][1-8]))?(\s(\d+\s\d+))?$/;
    
    return fenRegex.test(fen);
}

export class ClonedBoard extends Board {

    constructor(board: Board) {
        super("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

        this.board = board.GetBoardArray().map(row => row.slice());
    }

    MovePiece(from: Square, to: Square): void {
        super.MovePiece(from, to);
    }

    KingInCheck(side: Side): boolean {
        return super.KingInCheck(side);
    }
}