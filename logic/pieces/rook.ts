import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import { Board } from "../board";
import Square from "../utilities/square";
import { PieceBase } from "./pieceBase";

export class Rook extends PieceBase {
    public readonly type: PieceType = PieceType.ROOK;

    constructor(side: Side) {
        super(side, 'r');
    }

    public getPossibleMoves(board: Board): Square[] {
        return this.filterOutIllegalMoves(this.rookMoves(board), board);
    }
}
