import ChessPiece from './pieceBase'

export default class Knight extends ChessPiece {

  GetMoves() {
    return 'moves';
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'knight';
  }

}