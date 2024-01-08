import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import { Board } from "../board";
import Square from "../utilities/square";
import { PieceBase } from "./pieceBase";

export class Knight extends PieceBase {

    public readonly type: PieceType = PieceType.KNIGHT;

    constructor(side: Side) {
        super(side, 'n');
    }

    public getPossibleMoves(board: Board): Square[] {
        return this.filterOutIllegalMoves(this.knightMoves(board), board);
    }

}
