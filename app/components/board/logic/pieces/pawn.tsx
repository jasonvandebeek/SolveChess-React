import PieceBase from './pieceBase';
import ChessPiece from './pieceBase'

export default class Pawn extends ChessPiece {

  GetMoves(board: (PieceBase | null)[][]): number[][] {
    const currentSquare = this.FindSelf(board);
    const possibleMoves = [];
    const side = this.GetSide();
    const forwardDirection = side == 'black' ? 1 : -1;

    if(board[currentSquare.Rank + forwardDirection][currentSquare.File] === null) {
      possibleMoves.push([currentSquare.Rank + forwardDirection, currentSquare.File])

      if(side === 'white' && currentSquare.Rank === 6 || side === 'black' && currentSquare.Rank === 1) {
        if(board[currentSquare.Rank + forwardDirection * 2][currentSquare.File] === null) {
          possibleMoves.push([currentSquare.Rank + forwardDirection * 2, currentSquare.File])
        }
      }
    }

    if(currentSquare.File - 1 >= 0) {
      const target = board[currentSquare.Rank + forwardDirection][currentSquare.File - 1];
      if(target !== null && target.GetSide() !== side)
        possibleMoves.push([currentSquare.Rank + forwardDirection, currentSquare.File - 1])
    }

    if(currentSquare.File + 1 < 8) {
      const target = board[currentSquare.Rank + forwardDirection][currentSquare.File + 1];
      if(target !== null && target.GetSide() !== side)
        possibleMoves.push([currentSquare.Rank + forwardDirection, currentSquare.File + 1])
    }

    return possibleMoves;
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'pawn';
  }

}