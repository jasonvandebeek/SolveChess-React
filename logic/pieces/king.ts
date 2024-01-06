import PieceType from '../attributes/PieceType';
import Side from '../attributes/Side';
import { Board } from "../board";
import Square from '../utilities/square';
import { PieceBase } from './pieceBase';

export class King extends PieceBase {
	
    public readonly type: PieceType = PieceType.KING;

    constructor(side: Side) {
        super(side, 'k');
    }

    public getPossibleMoves(board: Board): Square[] {
        const moves = this.kingMoves(board).concat(this.castlingMoves(board));

        return this.filterOutIllegalMoves(moves, board);
    }

    private castlingMoves(board: Board): Square[] {
        if (this.side === Side.WHITE) {
            return this.whiteSideCastlingMoves(board);
        } else {
            return this.blackSideCastlingMoves(board);
        }
    }

    private whiteSideCastlingMoves(board: Board): Square[] {
        if (!this.isAtStartingPosition(board)) return [];

        const result: Square[] = [];

        if (board.castlingRightWhiteKingSide && this.kingSideClear(board)) {
            result.push(new Square(7, 6));
        }

        if (board.castlingRightWhiteQueenSide && this.queenSideClear(board)) {
            result.push(new Square(7, 2));
        }

        return result;
    }

    private isAtStartingPosition(board: Board): boolean {
        const square = board.getSquareOfPiece(this);
        return (square.equals(new Square(1, 5)) && this.side === Side.WHITE) || (square.equals(new Square(7, 5)) && this.side === Side.BLACK);
    }

    private queenSideClear(board: Board): boolean {
        const moves = this.traceMoves(board, 0, -1);
        return moves.length === 3;
    }

    private kingSideClear(board: Board): boolean {
        const moves = this.traceMoves(board, 0, 1);
        return moves.length === 2;
    }

    private blackSideCastlingMoves(board: Board): Square[] {
        if (!this.isAtStartingPosition(board)) return [];

        const result: Square[] = [];

        if (board.castlingRightBlackKingSide && this.kingSideClear(board)) {
            result.push(new Square(0, 6));
        }

        if (board.castlingRightBlackQueenSide && this.queenSideClear(board)) {
            result.push(new Square(0, 2));
        }

        return result;
    }

    public isChecked(board: Board): boolean {
        if (this.attackingPieceOfType(board, this.pawnMoves(board), PieceType.PAWN)) return true;
        if (this.attackingPieceOfType(board, this.rookMoves(board), PieceType.ROOK)) return true;
        if (this.attackingPieceOfType(board, this.knightMoves(board), PieceType.KNIGHT)) return true;
        if (this.attackingPieceOfType(board, this.bishopMoves(board), PieceType.BISHOP)) return true;
        if (this.attackingPieceOfType(board, this.queenMoves(board), PieceType.QUEEN)) return true;
        if (this.attackingPieceOfType(board, this.kingMoves(board), PieceType.KING)) return true;

        return false;
    }

    private attackingPieceOfType(board: Board, moves: Square[], type: PieceType): boolean {
        for (const move of moves) {
            const target = board.getPieceAt(move);
            if (target !== null && target.type === type) {
                return true;
            }
        }

        return false;
    }
}