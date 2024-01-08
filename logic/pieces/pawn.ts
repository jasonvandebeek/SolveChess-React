import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import { Board } from "../board";
import Square from "../utilities/square";
import { PieceBase } from "./pieceBase";

export class Pawn extends PieceBase {
    public readonly type: PieceType = PieceType.PAWN;

    constructor(side: Side) {
        super(side, 'p');
    }

    public getPossibleMoves(board: Board): Square[] {
        return this.filterOutIllegalMoves(this.pawnMoves(board), board);
    }
}
