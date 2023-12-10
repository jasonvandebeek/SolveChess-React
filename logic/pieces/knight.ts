import PieceBase from "./pieceBase";
import Board from "../board";
import Square from "../utilities/square";
import PieceType from "../types/PieceType";

export default class Knight extends PieceBase {

	protected _type: PieceType = "knight";

	//TODO: check for opponent check on king
	GetPossibleMoves(board: Board): Square[] {
		return this.FilterOutIllegalMoves(this.KnightMoves(board), board);
	}

}
