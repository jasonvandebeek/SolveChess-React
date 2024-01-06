import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import Board from "../board";
import Square from "../utilities/square";
import { PieceBase } from "./pieceBase";

export class Bishop extends PieceBase {
	
    public readonly type: PieceType = PieceType.BISHOP;

    constructor(side: Side) {
        super(side, 'b');
    }

    public getPossibleMoves(board: Board): Square[] {
        return this.filterOutIllegalMoves(this.bishopMoves(board), board);
    }
}
