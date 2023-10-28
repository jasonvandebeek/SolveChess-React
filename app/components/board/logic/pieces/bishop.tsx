import Board from '../board';
import Square from '../utilities/square';
import PieceBase from './pieceBase';
import ChessPiece from './pieceBase';

export default class Bishop extends ChessPiece {

  GetPossibleMoves(board: Board): Square[] {
    throw new Error('Not implemented exception!');
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'bishop';
  }

}