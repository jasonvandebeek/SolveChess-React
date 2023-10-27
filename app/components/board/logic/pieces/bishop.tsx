import ChessPiece from './pieceBase'

export default class Bishop extends ChessPiece {

    GetMoves() {
      return 'moves';
    }

    GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
      return 'bishop';
    }

}