import ChessPiece from './pieceBase'

export default class Rook extends ChessPiece {

  GetMoves() {
    return 'moves';
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'rook';
  }

}