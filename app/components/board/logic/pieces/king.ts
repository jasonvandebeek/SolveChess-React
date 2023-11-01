import Board from '../board';
import PieceType from '../types/PieceType';
import Square from '../utilities/square';
import ChessPiece from './pieceBase';

export default class King extends ChessPiece {

	protected _type: PieceType = "king";

	//TODO: check for opponent check on this
	//TODO: castling
	GetPossibleMoves(board: Board, attackingOnly: boolean): Square[] {
		const boardArray = board.GetBoardArray();
		const currentSquare = board.GetSquareOfPiece(this);
		const possibleMoves = [];

		for (let i = 0; i < 8; i++) {
			const rankOffset = [1, 1, 1, 0, 0, -1, -1, -1][i];
			const fileOffset = [-1, 0, 1, -1, 1, -1, 0, 1][i];

			let rank = currentSquare.Rank + rankOffset;
			let file = currentSquare.File + fileOffset;

			if (rank >= 0 && rank < 8 && file >= 0 && file < 8) {
				const targetPiece = boardArray[rank][file];
				
				if(targetPiece != null) {
					if(targetPiece.Side === this.Side)
						continue;

					if(attackingOnly)
						possibleMoves.push(new Square(rank, file));
					else if(!this.KingInCheckAfterMove(new Square(rank, file), board)) 
						possibleMoves.push(new Square(rank, file));
				} else if(!attackingOnly && !this.KingInCheckAfterMove(new Square(rank, file), board)) {
					possibleMoves.push(new Square(rank, file));
				}
			}
		}

		return possibleMoves;
	}

}