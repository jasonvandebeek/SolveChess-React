import PieceBase from './pieceBase';
import ChessPiece from './pieceBase'

export default class Rook extends ChessPiece {

  GetMoves(board: (PieceBase | null)[][]): number[][] {
    return [[0, 0]];
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'rook';
  }

}