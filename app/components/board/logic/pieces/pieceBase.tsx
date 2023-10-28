import Board from "../board";
import Square from "../utilities/square";
import { v4 as uuidv4 } from 'uuid';

export default abstract class PieceBase {

    private readonly _id: string;
    get Id(): string  {
        return this._id;
    }

    private readonly _side: 'white' | 'black';
    get Side(): 'white' | 'black' {
        return this._side;
    }

    constructor(side: 'white' | 'black') {
        this._id = uuidv4();
        this._side = side;
    }

    abstract GetPossibleMoves(board: Board): Square[];
    abstract GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

    CanMoveToSquare(target: Square, board: Board) {
        const moves = this.GetPossibleMoves(board);

        for (const move of moves) {
            if (target.Equals(move)) 
                return true;
        }

        return false;
    }

    Equals(obj: any) {
        if (obj == null || this.constructor !== obj.constructor) {
            return false;
        }

        const other = obj as PieceBase;

        return this.Id === other.Id;
    } 
}