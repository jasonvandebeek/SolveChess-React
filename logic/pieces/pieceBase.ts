import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import { Board, ClonedBoard } from "../board";
import Square from "../utilities/square";
import { v4 as uuidv4 } from 'uuid';

export abstract class PieceBase {

	private readonly _id: string;
    get Id(): string  {
        return this._id;
    }

    private readonly _side: Side;
    public get side(): Side {
        return this._side;
    }

    public abstract get type(): PieceType;

    private readonly _notation: string;
    public get notation(): string {
        return this._side === Side.WHITE ? this._notation.toUpperCase() : this._notation.toLowerCase();
    }

    protected constructor(side: Side, notation: string) {
		this._id = uuidv4();
        this._side = side;
        this._notation = notation;
    }

    public abstract getPossibleMoves(board: Board): Square[];

    public canMoveToSquare(target: Square, board: Board): boolean {
        return this.getPossibleMoves(board).some(move => target.equals(move));
    }

    protected pawnMoves(board: Board): Square[] {
        return this.getForwardPawnMoves(board).concat(this.getAttackingPawnMoves(board));
    }

    private getForwardPawnMoves(board: Board): Square[] {
        const moveOne = this.getForwardPawnMove(1, board);
        if (moveOne === null) 
            return [];

        const moves: Square[] = [moveOne];

        const moveTwo = this.getForwardPawnMove(2, board);
        if (this.pawnIsAtStartingPosition(board) && moveTwo !== null)
            moves.push(moveTwo);

        return moves;
    }

    private pawnIsAtStartingPosition(board: Board): boolean {
        const position = board.getSquareOfPiece(this);
        return position.rank === 1 || position.rank === 6;
    }

    private getForwardPawnMove(rankOffsetMultiplier: number, board: Board): Square | null {
        const startingPosition = board.getSquareOfPiece(this);
        const forwardDirection = this._side === Side.WHITE ? -1 : 1;

        if (!this.isWithinBoardBounds(startingPosition.rank + rankOffsetMultiplier * forwardDirection, startingPosition.file)) {
            return null;
        }

        const targetSquare = new Square(startingPosition.rank + rankOffsetMultiplier * forwardDirection, startingPosition.file);
        if (board.getPieceAt(targetSquare) !== null) {
            return null;
        }

        return targetSquare;
    }

    private getAttackingPawnMoves(board: Board): Square[] {
        const offsets = [-1, 1];
        return offsets.map(offset => this.getAttackingPawnMove(offset, board)).filter(move => move !== null) as Square[];
    }

    private getAttackingPawnMove(fileOffset: number, board: Board): Square | null {
        const startingPosition = board.getSquareOfPiece(this);
        const forwardDirection = this._side === Side.WHITE ? -1 : 1;

        if (!this.isWithinBoardBounds(startingPosition.rank + forwardDirection, startingPosition.file + fileOffset)) {
            return null;
        }

        const targetSquare = new Square(startingPosition.rank + forwardDirection, startingPosition.file + fileOffset);
        if (!this.pawnIsAttackingSquare(targetSquare, board)) {
            return null;
        }

        return targetSquare;
    }

    private pawnIsAttackingSquare(targetSquare: Square, board: Board): boolean {
        const target = board.getPieceAt(targetSquare);

        return (target !== null && target.side !== this._side) || targetSquare.equals(board.enpassantSquare);
    }

    protected rookMoves(board: Board): Square[] {
        const rankOffsets = [1, 0, -1, 0];
        const fileOffsets = [0, -1, 0, 1];

        return this.multiDirectionalTraceMoves(board, rankOffsets, fileOffsets);
    }

    protected knightMoves(board: Board): Square[] {
        const rankOffsets = [1, 2, 2, 1, -1, -2, -2, -1];
        const fileOffsets = [2, 1, -1, -2, -2, -1, 1, 2];

        return this.multiPointSingularMoves(board, rankOffsets, fileOffsets);
    }

    protected bishopMoves(board: Board): Square[] {
        const rankOffsets = [1, 1, -1, -1];
        const fileOffsets = [1, -1, 1, -1];

        return this.multiDirectionalTraceMoves(board, rankOffsets, fileOffsets);
    }

    protected queenMoves(board: Board): Square[] {
        return this.rookMoves(board).concat(this.bishopMoves(board));
    }

    protected kingMoves(board: Board): Square[] {
        const rankOffsets = [1, 1, 1, 0, 0, -1, -1, -1];
        const fileOffsets = [-1, 0, 1, -1, 1, -1, 0, 1];

        return this.multiPointSingularMoves(board, rankOffsets, fileOffsets);
    }

    protected multiPointSingularMoves(board: Board, rankOffsets: number[], fileOffsets: number[]): Square[] {
        const moves: Square[] = [];

		for (let i = 0; i < rankOffsets.length; i++) {
			const move = this.singularMove(board, rankOffsets[i], fileOffsets[i]);
			if (move !== null) {
				moves.push(move);
			}
		}

		return moves;
    }

    protected multiDirectionalTraceMoves(board: Board, rankOffsets: number[], fileOffsets: number[]): Square[] {
        let moves: Square[] = [];

        for (let i = 0; i < rankOffsets.length; i++) {
            moves = moves.concat(this.traceMoves(board, rankOffsets[i], fileOffsets[i]));
        }

        return moves;
    }

    protected traceMoves(board: Board, rankOffset: number, fileOffset: number): Square[] {
        const startingPosition = board.getSquareOfPiece(this);
        let rank = startingPosition.rank + rankOffset;
        let file = startingPosition.file + fileOffset;

        let keepLooking = true;
        const result: Square[] = [];

        while (this.isWithinBoardBounds(rank, file) && keepLooking) {
            const targetSquare = new Square(rank, file);
            const targetPiece = board.getPieceAt(targetSquare);

            if (targetPiece !== null) {
                if (targetPiece.side !== this._side) {
                    result.push(targetSquare);
                }

                keepLooking = false;
            } else {
                rank += rankOffset;
                file += fileOffset;

                result.push(targetSquare);
            }
        }

        return result;
    }

    protected singularMove(board: Board, rankOffset: number, fileOffset: number): Square | null {
        const startingPosition = board.getSquareOfPiece(this);
        const rank = startingPosition.rank + rankOffset;
        const file = startingPosition.file + fileOffset;

        if (!this.isWithinBoardBounds(rank, file)) {
            return null;
        }

        const targetSquare = new Square(rank, file);
        const targetPiece = board.getPieceAt(targetSquare);

        if (targetPiece !== null && targetPiece.side === this._side) {
            return null;
        }

        return targetSquare;
    }

    protected filterOutIllegalMoves(moves: Square[], board: Board): Square[] {
		return moves.filter(move => !this.kingIsInCheckAfterMove(move, board));
	}
	
	private kingIsInCheckAfterMove(move: Square, board: Board): boolean {
		const clone = new ClonedBoard(board);
		const currentSquare = clone.getSquareOfPiece(this);
	
		clone.movePiece(currentSquare, move);
		return clone.kingInCheck(this.side);
	}

    private isWithinBoardBounds(rank: number, file: number): boolean {
        return rank >= 0 && rank < 8 && file >= 0 && file < 8;
    }

    public hasPossibleMoves(board: Board): boolean {
        return this.getPossibleMoves(board).length > 0;
    }

	equals(obj: any) {
        if (obj == null || this.constructor !== obj.constructor) {
            return false;
        }

        const other = obj as PieceBase;

        return this.Id === other.Id;
    } 

}
