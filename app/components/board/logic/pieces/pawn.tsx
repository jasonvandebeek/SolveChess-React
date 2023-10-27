import ChessPiece from './pieceBase'

export default class Pawn extends ChessPiece {

  GetMoves() {
    return 'moves';
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'pawn';
  }

}