import Bishop from "./bishop";
import King from "./king";
import Knight from "./knight";
import Pawn from "./pawn";
import Queen from "./queen";
import Rook from "./rook";

export default class PieceFactory {

    BuildPiece(type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k', side: 'black' | 'white') {
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

}