import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import Board from "../board";
import Square from "../utilities/square";
import { PieceBase } from "./pieceBase";

export class Queen extends PieceBase {
    public readonly type: PieceType = PieceType.QUEEN;

    constructor(side: Side) {
        super(side, 'q');
    }

    public getPossibleMoves(board: Board): Square[] {
        return this.filterOutIllegalMoves(this.queenMoves(board), board);
    }
}
