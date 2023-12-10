import Board from '../board';
import PieceType from '../types/PieceType';
import Square from '../utilities/square';
import PieceBase from './pieceBase';

export default class King extends PieceBase {

	protected _type: PieceType = "king";

	//TODO: check for opponent check on this
	GetPossibleMoves(board: Board): Square[] {
		return this.FilterOutIllegalMoves(this.KingMoves(board), board);
	}

	IsChecked(board: Board): boolean {
		if(this.AttackingPieceOfType(board, this.PawnMoves(board), 'pawn'))
			return true;

		if(this.AttackingPieceOfType(board, this.RookMoves(board), 'rook'))
			return true;

		if(this.AttackingPieceOfType(board, this.KnightMoves(board), 'knight'))
			return true;

		if(this.AttackingPieceOfType(board, this.BishopMoves(board), 'bishop'))
			return true;

		if(this.AttackingPieceOfType(board, this.QueenMoves(board), 'queen'))
			return true;

		if(this.AttackingPieceOfType(board, this.KingMoves(board), 'king'))
			return true;

		return false;
	}

	private AttackingPieceOfType(board: Board, moves: Square[], type: PieceType): boolean {
		let found = false;

		for (const move of moves) {
			const target = board.GetPieceAt(move);

			if (target != null && target.Type == type) {
				found = true;
				break;
			}
		}

		return found;
	}

}