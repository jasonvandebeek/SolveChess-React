
export default class Square {
    private readonly _file: number;
    get File(): number {
        return this._file;
    }

    private readonly _rank: number;
    get Rank(): number {
        return this._rank;
    }

    get Notation(): string {
        return `${String.fromCharCode('A'.charCodeAt(0) + this._file)}${String.fromCharCode('1'.charCodeAt(0) + this._rank)}`;
    }

    constructor(rank?: number, file?: number, notation?: string) {
        if (typeof rank === 'number' && typeof file === 'number') {
            if (rank < 0 || rank > 7 || file < 0 || file > 7)
                throw new Error('Arguments out of bounds exception!')
    
            this._rank = rank;
            this._file = file;
        } else if(notation) {  
            if (notation.length !== 2) {
                throw new Error('Invalid argument notation!');
            }
    
            const fileChar = notation[0].toUpperCase();
            const rankChar = notation[1];
    
            if (!fileChar.match(/[A-H]/) || !rankChar.match(/[1-8]/)) {
                throw new Error('Invalid argument notation!');
            }
    
            this._file = fileChar.charCodeAt(0) - 'A'.charCodeAt(0);
            this._rank = rankChar.charCodeAt(0) - '1'.charCodeAt(0);
        } else {
            throw new Error('Missing arguments exception!');
        }           
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
