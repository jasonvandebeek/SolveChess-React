import PieceBase from './pieceBase';
import ChessPiece from './pieceBase';
import Board from '../board';
import Square from '../utilities/square';

export default class Pawn extends ChessPiece {

  //TODO: add enpassant
  //TODO: check for opponent check on king
  GetPossibleMoves(board: Board): Square[] {
    const boardArray = board.GetBoardArray();
    const currentSquare = board.GetSquareOfPiece(this);
    const possibleMoves = [];
    const forwardDirection = this.Side == 'black' ? 1 : -1;

    let targetSquare = new Square(currentSquare.Rank + forwardDirection, currentSquare.File);
    if(boardArray[targetSquare.Rank][targetSquare.File] === null) {
      possibleMoves.push(targetSquare);

      if(this.Side === 'white' && currentSquare.Rank === 6 || this.Side === 'black' && currentSquare.Rank === 1) {
        targetSquare = new Square(currentSquare.Rank + forwardDirection * 2, currentSquare.File);

        if(boardArray[targetSquare.Rank][targetSquare.File] === null) {
          possibleMoves.push(targetSquare);
        }
      }
    }

    if(currentSquare.File - 1 >= 0) {
      targetSquare = new Square(currentSquare.Rank + forwardDirection, currentSquare.File - 1);
      const target = boardArray[targetSquare.Rank][targetSquare.File];
      if(target !== null && target.Side !== this.Side)
        possibleMoves.push(targetSquare);
    }

    if(currentSquare.File + 1 < 8) {
      targetSquare = new Square(currentSquare.Rank + forwardDirection, currentSquare.File + 1);
      const target = boardArray[targetSquare.Rank][targetSquare.File];
      if(target !== null && target.Side !== this.Side)
        possibleMoves.push(targetSquare);
    }

    return possibleMoves;
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'pawn';
  }

}