
export default abstract class PieceBase {
    constructor(side: string) {
        console.log(side);
    }

    abstract getMoves(): string;
}