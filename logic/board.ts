import PieceType from "./attributes/PieceType";
import Side from "./attributes/Side";
import PieceFactory from "./factories/pieceFactory";
import { King } from "./pieces/king";
import { PieceBase } from "./pieces/pieceBase";
import Square from "./utilities/square";

export class Board {

    protected _boardArray: (PieceBase | null)[][] = new Array(8).fill(null).map(() => new Array(8).fill(null));

    public get boardArray(): (PieceBase | null)[][] {
        const clonedArray: (PieceBase | null)[][] = [];

        for (let rank = 0; rank < this._boardArray.length; rank++) {
            clonedArray[rank] = this._boardArray[rank].slice();
        }

        return clonedArray;
    }

    public castlingRightBlackKingSide: boolean;
    public castlingRightBlackQueenSide: boolean;
    public castlingRightWhiteKingSide: boolean;
    public castlingRightWhiteQueenSide: boolean;
    public enpassantSquare: Square | null;

    constructor(fen: string, castlingRightBlackKingSide: boolean, castlingRightBlackQueenSide: boolean, castlingRightWhiteKingSide: boolean, castlingRightWhiteQueenSide: boolean, enpassantSquare: Square | null) {
        if (!this.isValidFEN(fen))
            throw new Error('Invalid FEN!')

        const ranks = fen.split(' ')[0].split('/');

        for (let rank = 0; rank < 8; rank++) {
            let file = 0;
            for (const char of ranks[rank]) {
                if (/[1-8]/.test(char)) {
                    file += parseInt(char);
                } else {
                    const type = char.toLowerCase() as "p" | "r" | "n" | "b" | "q" | "k";
                    const side = char === char.toUpperCase() ? Side.WHITE : Side.BLACK;

                    this._boardArray[rank][file] = PieceFactory.buildPiece(type, side);
                    file++;
                }
            }
        }

        this.castlingRightBlackKingSide = castlingRightBlackKingSide;
        this.castlingRightBlackQueenSide = castlingRightBlackQueenSide;
        this.castlingRightWhiteKingSide = castlingRightWhiteKingSide;
        this.castlingRightWhiteQueenSide = castlingRightWhiteQueenSide;

        this.enpassantSquare = enpassantSquare;
    }

    public placePieceAtSquare(piece: PieceBase, square: Square): void {
        this._boardArray[square.rank][square.file] = piece;
    }

    public getSquareOfPiece(piece: PieceBase): Square {
        for (let rank = 0; rank < 8; rank++) {
            const square = this.findPieceOnRank(rank, piece);
            if (square !== null) {
                return square;
            }
        }

        throw new Error('Invalid board given with piece!');
    }

    public getPieceAt(square: Square): PieceBase | null {
        return this._boardArray[square.rank][square.file];
    }

    public movePiece(from: Square, to: Square): void {
        const piece = this.getPieceAt(from);
        if (piece === null) {
            return;
        }

        this._boardArray[from.rank][from.file] = null;
        this._boardArray[to.rank][to.file] = piece;
    }

    public promotePiece(from: Square, to: Square, promotionType: PieceType): void {
        const piece = this.getPieceAt(from);
        if (piece === null) {
            return;
        }

        const promotionPiece = PieceFactory.buildPieceFromType(promotionType, piece.side);

        this._boardArray[from.rank][from.file] = null;
        this._boardArray[to.rank][to.file] = promotionPiece;
    }

    public kingInCheck(side: Side): boolean {
        const king = this.getKing(side);
        if (king === null) {
            return false;
        }

        return king.isChecked(this);
    }

    public kingInDraw(side: Side): boolean {
        if (this.kingInCheck(side)) {
            return false;
        }

        return !this.anyPieceOfSideHasMoves(side);
    }

    public kingIsMated(side: Side): boolean {
        if (!this.kingInCheck(side)) {
            return false;
        }

        return !this.anyPieceOfSideHasMoves(side);
    }

    private isPieceAtPosition(piece: PieceBase, rank: number, file: number): boolean {
        return piece.equals(this._boardArray[rank][file]);
    }

    private findPieceOnRank(rank: number, piece: PieceBase): Square | null {
        for (let file = 0; file < this._boardArray[rank].length; file++) {
            if (this.isPieceAtPosition(piece, rank, file)) {
                return new Square(rank, file);
            }
        }

        return null;
    }

    private getKing(side: Side): King | null {
        for (let rank = 0; rank < this._boardArray.length; rank++) {
            const king = this.findKingOnRank(side, rank);
            if (king !== null) {
                return king;
            }
        }

        return null;
    }

    private anyPieceOfSideHasMoves(side: Side): boolean {
        for (const row of this._boardArray) {
            for (const piece of row) {
                if (piece !== null && piece.side === side && piece.hasPossibleMoves(this)) {
                    return true;
                }
            }
        }

        return false;
    }

    private findKingOnRank(side: Side, rank: number): King | null {
        for (let file = 0; file < this._boardArray[rank].length; file++) {
            if (this.positionHasKingOfSide(side, rank, file)) {
                return this.getPieceAt(new Square(rank, file)) as King;
            }
        }

        return null;
    }

    private positionHasKingOfSide(side: Side, rank: number, file: number): boolean {
        const piece = this._boardArray[rank][file];

        return piece !== null && piece.type === PieceType.KING && piece.side === side;
    }

    private isValidFEN(fen: string): boolean {
        const fenRegex = /^\s*(((?:[rnbqkpRNBQKP1-8]+\/){7})[rnbqkpRNBQKP1-8]+)(\s([b|w]))?(\s([K|Q|k|q]{1,4}))?(\s(-|[a-h][1-8]))?(\s(\d+\s\d+))?$/;
        
        return fenRegex.test(fen);
    }

}

export class ClonedBoard extends Board {

    constructor(board: Board) {
        super("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", board.castlingRightBlackKingSide, board.castlingRightBlackQueenSide, board.castlingRightWhiteKingSide, board.castlingRightWhiteQueenSide, board.enpassantSquare);

        this._boardArray = board.boardArray;
    }

    MovePiece(from: Square, to: Square): void {
        super.MovePiece(from, to);
    }

    KingInCheck(side: Side): boolean {
        return super.KingInCheck(side);
    }
}