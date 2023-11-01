import ChessPiece from './pieceBase';
import Board from '../board';
import Square from '../utilities/square';
import PieceType from '../types/PieceType';

export default class Queen extends ChessPiece {

	protected _type: PieceType = "queen";

	GetPossibleMoves(board: Board, attackingOnly: boolean): Square[] {
		const boardArray = board.GetBoardArray();
		const currentSquare = board.GetSquareOfPiece(this);
		const possibleMoves = [];

		for (let i = 0; i < 8; i++) {
			const rankOffset = [1, 0, -1, 0, 1, 1, -1, -1][i];
			const fileOffset = [0, -1, 0, 1, 1, -1, 1, -1][i];

			let rank = currentSquare.Rank + rankOffset;
			let file = currentSquare.File + fileOffset;

			while (rank >= 0 && rank < 8 && file >= 0 && file < 8) {
				const targetPiece = boardArray[rank][file];

				if (targetPiece != null) {
					if (targetPiece.Side === this.Side)
						break;

					if(attackingOnly)
						possibleMoves.push(new Square(rank, file));
					else if(!this.KingInCheckAfterMove(new Square(rank, file), board)) 
						possibleMoves.push(new Square(rank, file));

					break;
				}

				if(!attackingOnly && !this.KingInCheckAfterMove(new Square(rank, file), board))
					possibleMoves.push(new Square(rank, file));

				rank += rankOffset;
				file += fileOffset;
			}
		}

		return possibleMoves;
	}

}