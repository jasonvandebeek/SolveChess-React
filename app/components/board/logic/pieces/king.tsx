import ChessPiece from './pieceBase'

export default class King extends ChessPiece {

  GetMoves() {
    return 'moves';
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'king';
  }

}