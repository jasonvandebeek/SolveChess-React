
export default abstract class PieceBase {
    private side: 'white' | 'black';

    constructor(side: 'white' | 'black') {
        this.side = side;
    }

    abstract GetMoves(): string;
    abstract GetType(): 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
     
    GetSide(): 'white' | 'black' {
        return this.side;
    }
}