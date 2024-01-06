
export default class Square {
    private readonly _file: number;
    get file(): number {
        return this._file;
    }

    private readonly _rank: number;
    get rank(): number {
        return this._rank;
    }

    constructor(rank: number, file: number) {
        if (rank < 0 || rank > 7 || file < 0 || file > 7)
            throw new Error('Arguments out of bounds exception!')

        this._rank = rank;
        this._file = file;
    }

    equals(obj: any): boolean {
        if (obj == null || this.constructor !== obj.constructor) {
            return false;
        }

        const other = obj as Square;
        
        return this.hashCode() === other.hashCode();
    }

    hashCode(): number {
        return this.rank * 10 + this.file;
    }
}
