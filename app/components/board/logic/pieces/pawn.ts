import ChessPiece from './pieceBase';
import Board from '../board';
import Square from '../utilities/square';
import PieceType from '../types/PieceType';

export default class Pawn extends ChessPiece {

	protected _type: PieceType = "pawn";

	private forwardDirection = this.Side == 'black' ? 1 : -1;

	//TODO: add enpassant
	//TODO: check for opponent check on king
	GetPossibleMoves(board: Board, attackingOnly: boolean): Square[] {
		const boardArray = board.GetBoardArray();
		const currentSquare = board.GetSquareOfPiece(this);
		const possibleMoves: Square[] = [];
		
		let targetSquare = new Square(currentSquare.Rank + this.forwardDirection, currentSquare.File);

		if (boardArray[targetSquare.Rank][targetSquare.File] === null && !attackingOnly) {
			if(!this.KingInCheckAfterMove(targetSquare, board))
				possibleMoves.push(targetSquare);

			if (this.Side === 'white' && currentSquare.Rank === 6 || this.Side === 'black' && currentSquare.Rank === 1) {
				targetSquare = new Square(currentSquare.Rank + this.forwardDirection * 2, currentSquare.File);

				if (boardArray[targetSquare.Rank][targetSquare.File] === null && !this.KingInCheckAfterMove(targetSquare, board))
					possibleMoves.push(targetSquare);
			}
		}

		if (currentSquare.File - 1 >= 0) {
			targetSquare = new Square(currentSquare.Rank + this.forwardDirection, currentSquare.File - 1);
			const target = boardArray[targetSquare.Rank][targetSquare.File];
			if (target !== null && target.Side !== this.Side)
				if(attackingOnly)
					possibleMoves.push(targetSquare);
				else if(!this.KingInCheckAfterMove(targetSquare, board)) 
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

}