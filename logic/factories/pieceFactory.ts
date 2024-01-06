import PieceType from "../attributes/PieceType";
import Side from "../attributes/Side";
import { Bishop } from "../pieces/bishop";
import { King } from "../pieces/king";
import { Knight } from "../pieces/knight";
import { Pawn } from "../pieces/pawn";
import { Queen } from "../pieces/queen";
import { Rook } from "../pieces/rook";


export default class PieceFactory {

    public static buildPiece(type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k', side: Side) {
        switch(type) {
            case('p'):
                return new Pawn(side);
            case('r'):
                return new Rook(side);
            case('n'):
                return new Knight(side);
            case('b'):
                return new Bishop(side);
            case('q'):
                return new Queen(side);
            case('k'):
                return new King(side);
        }
    }

    public static buildPieceFromType(type: PieceType, side: Side) {
        switch(type) {
            case(PieceType.PAWN):
                return new Pawn(side);
            case(PieceType.ROOK):
                return new Rook(side);
            case(PieceType.KNIGHT):
                return new Knight(side);
            case(PieceType.BISHOP):
                return new Bishop(side);
            case(PieceType.QUEEN):
                return new Queen(side);
            case(PieceType.KING):
                return new King(side);
        }
    }

}