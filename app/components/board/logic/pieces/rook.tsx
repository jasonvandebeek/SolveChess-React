import PieceBase from './pieceBase';
import ChessPiece from './pieceBase';
import Board from '../board';
import Square from '../utilities/square';

export default class Rook extends ChessPiece {

  GetPossibleMoves(board: Board): Square[] {
    throw new Error('Not implemented exception!');
  }

  GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king' {
    return 'rook';
  }

}