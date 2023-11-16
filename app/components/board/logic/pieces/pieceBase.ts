import Board, { ClonedBoard } from "../board";
import Square from "../utilities/square";
import { v4 as uuidv4 } from 'uuid';
import PieceType from '../types/PieceType';
import Side from '../types/Side';

export default abstract class PieceBase {
    private readonly _id: string;
    get Id(): string  {
        return this._id;
    }

    private readonly _side: Side;
    get Side(): Side {
        return this._side;
    }

    protected abstract readonly _type: PieceType;
    get Type(): PieceType {
        return this._type;
    }

    constructor(side: Side) {
        this._id = uuidv4();
        this._side = side;
    }

    abstract GetPossibleMoves(board: Board): Square[];

    CanMoveToSquare(target: Square, board: Board): boolean {
        const moves = this.GetPossibleMoves(board);

        for (const move of moves) {
            if (target.Equals(move)) 
                return true;
        }

        return false;
    }

    //TODO: add enpassant
    protected PawnMoves(board: Board): Square[] {
        const boardArray = board.GetBoardArray();
        const startingPosition = board.GetSquareOfPiece(this);
        const forwardDirection = this.Side == 'white' ? -1 : 1;
		const moves: Square[] = [];
		let targetSquare = new Square(startingPosition.Rank + forwardDirection, startingPosition.File);

		if (boardArray[targetSquare.Rank][targetSquare.File] === null) {
			moves.push(targetSquare);

			if (this.Side === 'white' && startingPosition.Rank === 6 || this.Side === 'black' && startingPosition.Rank === 1) {
				targetSquare = new Square(startingPosition.Rank + forwardDirection * 2, startingPosition.File);

				if (boardArray[targetSquare.Rank][targetSquare.File] === null)
					moves.push(targetSquare);
			}
		}

		if (startingPosition.File - 1 >= 0) {
			targetSquare = new Square(startingPosition.Rank + forwardDirection, startingPosition.File - 1);
			const target = boardArray[targetSquare.Rank][targetSquare.File];

			if (target !== null && target.Side !== this.Side)
                moves.push(targetSquare);
		}

		if (startingPosition.File + 1 < 8) {
			targetSquare = new Square(startingPosition.Rank + forwardDirection, startingPosition.File + 1);
			const target = boardArray[targetSquare.Rank][targetSquare.File];

			if (target !== null && target.Side !== this.Side)
				moves.push(targetSquare);
		}

		return moves;
    }

    protected RookMoves(board: Board): Square[] {
        const boardArray = board.GetBoardArray();
		const startingPosition = board.GetSquareOfPiece(this);
		const moves = [];

		for (let i = 0; i < 4; i++) {
			const rankOffset = [1, 0, -1, 0][i];
			const fileOffset = [0, -1, 0, 1][i];

			let rank = startingPosition.Rank + rankOffset;
			let file = startingPosition.File + fileOffset;

			while (rank >= 0 && rank < 8 && file >= 0 && file < 8) {
				const targetPiece = boardArray[rank][file];

				if (targetPiece != null) {
					if (targetPiece.Side === this.Side)
						break;

					moves.push(new Square(rank, file));
					break;
				}

				moves.push(new Square(rank, file));

				rank += rankOffset;
				file += fileOffset;
			}
		}

		return moves;
    }

    protected KnightMoves(board: Board): Square[] {
        const boardArray = board.GetBoardArray();
		const startingPosition = board.GetSquareOfPiece(this);
		const moves = [];

		for (let i = 0; i < 8; i++) {
			const rankOffset = [1, 2, 2, 1, -1, -2, -2, -1][i];
			const fileOffset = [2, 1, -1, -2, -2, -1, 1, 2][i];

			let rank = startingPosition.Rank + rankOffset;
			let file = startingPosition.File + fileOffset;

			if (rank >= 0 && rank < 8 && file >= 0 && file < 8) {
				const targetPiece = boardArray[rank][file];
				
				if(targetPiece != null && targetPiece.Side === this.Side)
                    continue;
				
				moves.push(new Square(rank, file));
			}
		}

		return moves;
    }

    protected BishopMoves(board: Board): Square[] {
        const boardArray = board.GetBoardArray();
		const startingPosition = board.GetSquareOfPiece(this);
		const moves = [];

		for (let i = 0; i < 4; i++) {
			const rankOffset = [1, 1, -1, -1][i];
			const fileOffset = [1, -1, 1, -1][i];

			let rank = startingPosition.Rank + rankOffset;
			let file = startingPosition.File + fileOffset;

			while (rank >= 0 && rank < 8 && file >= 0 && file < 8) {
				const targetPiece = boardArray[rank][file];
				
				if (targetPiece != null) {
					if (targetPiece.Side === this.Side)
						break;
					
		
					moves.push(new Square(rank, file));
					break;
				}

				moves.push(new Square(rank, file));

				rank += rankOffset;
				file += fileOffset;
			}
		}

		return moves;
    }

    protected QueenMoves(board: Board): Square[] {
        return this.RookMoves(board).concat(this.BishopMoves(board));
    }

    //TODO: castling
    protected KingMoves(board: Board): Square[] {
        const boardArray = board.GetBoardArray();
		const startingPosition = board.GetSquareOfPiece(this);
		const moves = [];

		for (let i = 0; i < 8; i++) {
			const rankOffset = [1, 1, 1, 0, 0, -1, -1, -1][i];
			const fileOffset = [-1, 0, 1, -1, 1, -1, 0, 1][i];

			let rank = startingPosition.Rank + rankOffset;
			let file = startingPosition.File + fileOffset;

			if (rank >= 0 && rank < 8 && file >= 0 && file < 8) {
				const targetPiece = boardArray[rank][file];
				
				if(targetPiece != null && targetPiece.Side === this.Side)
					continue;

				moves.push(new Square(rank, file));
			}
		}

		return moves;
    }

    protected FilterOutIllegalMoves(moves: Square[], board: Board): Square[] {
        const legalMoves: Square[] = []; 
        
        moves.forEach(move => {
            const newBoard = new ClonedBoard(board);
            const currentSquare = board.GetSquareOfPiece(this);

            newBoard.MovePiece(currentSquare, move);
            if(!newBoard.KingInCheck(this.Side))
                legalMoves.push(move);
        });

        return legalMoves;
    }

    Equals(obj: any) {
        if (obj == null || this.constructor !== obj.constructor) {
            return false;
        }

        const other = obj as PieceBase;

        return this.Id === other.Id;
    } 
}