
export default class Square {
    private readonly _file: number;
    get File(): number {
        return this._file;
    }

    private readonly _rank: number;
    get Rank(): number {
        return this._rank;
    }

    constructor(rank: number, file: number) {
        if (rank < 0 || rank > 7 || file < 0 || file > 7)
            throw new Error('Arguments out of bounds exception!')

        this._rank = rank;
        this._file = file;
    }

    Equals(obj: any): boolean {
        if (obj == null || this.constructor !== obj.constructor) {
            return false;
        }

        const other = obj as Square;
        
        return this.HashCode() === other.HashCode();
    }

    HashCode(): number {
        return this.Rank * 10 + this.File;
    }
}
