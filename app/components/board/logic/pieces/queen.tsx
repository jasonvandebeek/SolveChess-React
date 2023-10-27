import ChessPiece from './pieceBase'

export default class Queen extends ChessPiece {

  GetMoves() {
    return 'moves';
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'queen';
  }

}