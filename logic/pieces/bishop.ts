import Board from '../board';
import PieceType from '../types/PieceType';
import Square from '../utilities/square';
import PieceBase from './pieceBase';

export default class Bishop extends PieceBase {

	protected _type: PieceType = "bishop";

	//TODO: check for opponent check on king
	GetPossibleMoves(board: Board): Square[] {
		return this.FilterOutIllegalMoves(this.BishopMoves(board), board);
	}

}