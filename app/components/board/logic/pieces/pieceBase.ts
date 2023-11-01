import Board, { ClonedBoard } from "../board";
import Square from "../utilities/square";
import { v4 as uuidv4 } from 'uuid';
import PieceType from '../types/PieceType';
import Side from '../types/Side';

export default abstract class PieceBase {
    private readonly _id: string;
    get Id(): string  {
        return this._id;
    }

    private readonly _side: Side;
    get Side(): Side {
        return this._side;
    }

    protected abstract readonly _type: PieceType;
    get Type(): PieceType {
        return this._type;
    }

    constructor(side: Side) {
        this._id = uuidv4();
        this._side = side;
    }

    abstract GetPossibleMoves(board: Board, attackingOnly: boolean): Square[];

    CanMoveToSquare(target: Square, board: Board) {
        const moves = this.GetPossibleMoves(board, false);

        for (const move of moves) {
            if (target.Equals(move)) 
                return true;
        }

        return false;
    }

    KingInCheckAfterMove(moveTo: Square, board: Board) {
        const newBoard = new ClonedBoard(board);
        const currentSquare = board.GetSquareOfPiece(this);

        newBoard.MovePiece(currentSquare, moveTo);
        return newBoard.KingInCheck(this.Side);
    }

    private PawnMoves(board: Board): Square[] {
        const boardArray = board.GetBoardArray();
        const startingPosition = board.GetSquareOfPiece(this);

        const forwardDirection = this.Side == 'white' ? -1 : 1;

		const possibleMoves: Square[] = [];
		
		let targetSquare = new Square(currentSquare.Rank + forwardDirection, currentSquare.File);

		if (boardArray[targetSquare.Rank][targetSquare.File] === null && !attackingOnly) {
			if(!this.KingInCheckAfterMove(targetSquare, board))
				possibleMoves.push(targetSquare);

			if (this.Side === 'white' && currentSquare.Rank === 6 || this.Side === 'black' && currentSquare.Rank === 1) {
				targetSquare = new Square(currentSquare.Rank + forwardDirection * 2, currentSquare.File);

				if (boardArray[targetSquare.Rank][targetSquare.File] === null && !this.KingInCheckAfterMove(targetSquare, board))
					possibleMoves.push(targetSquare);
			}
		}

		if (currentSquare.File - 1 >= 0) {
			targetSquare = new Square(currentSquare.Rank + forwardDirection, currentSquare.File - 1);
			const target = boardArray[targetSquare.Rank][targetSquare.File];
			if (target !== null && target.Side !== this.Side)
                possibleMoves.push(targetSquare);
		}

		if (currentSquare.File + 1 < 8) {
			targetSquare = new Square(currentSquare.Rank + this.forwardDirection, currentSquare.File + 1);
			const target = boardArray[targetSquare.Rank][targetSquare.File];
			if (target !== null && target.Side !== this.Side)
				if(attackingOnly)
					possibleMoves.push(targetSquare);
				else if(!this.KingInCheckAfterMove(targetSquare, board)) 
					possibleMoves.push(targetSquare);
		}

		return possibleMoves;
    }

    Equals(obj: any) {
        if (obj == null || this.constructor !== obj.constructor) {
            return false;
        }

        const other = obj as PieceBase;

        return this.Id === other.Id;
    } 
}