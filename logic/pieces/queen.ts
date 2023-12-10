import PieceBase from './pieceBase';
import Board from '../board';
import Square from '../utilities/square';
import PieceType from '../types/PieceType';

export default class Queen extends PieceBase {

	protected _type: PieceType = "queen";

	GetPossibleMoves(board: Board): Square[] {
		return this.FilterOutIllegalMoves(this.QueenMoves(board), board);
	}

}