import Board from "../board";
import Square from "../utilities/square";

export default abstract class PieceBase {
    private side: 'white' | 'black';

    constructor(side: 'white' | 'black') {
        this.side = side;
    }

    abstract GetMoves(board: Board): number[][];
    abstract GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
     
    GetSide(): 'white' | 'black' {
        return this.side;
    }

    FindSelf(board: Board) {
        for (let rank = 0; rank < board.length; rank++) {
            for (let file = 0; file < board[rank].length; file++) {
                if (board[rank][file] === this) {
                    return new Square(rank, file); 
                }
            }
        }

        throw new Error("Invalid board given with piece!")
    }

    CanMoveToSquare(target: Square, board: Board) {
        const moves = this.GetMoves(board);
        const coord = [to.Rank, to.File];

        let isCoordInMoves = false;
        for (const move of moves) {
            if (move[0] === coord[0] && move[1] === coord[1]) {
                isCoordInMoves = true;
                break;
            }
        }

        return isCoordInMoves;
    }
}