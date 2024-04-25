type ChessPieceKind = 'pawn' | 'queen' | 'rook' | 'bishop' | 'knight' | 'king';
type PlayerType = 'white' | 'black';

class ChessPiece {
    constructor(public kind: ChessPieceKind, public player: PlayerType){

    }

}

function bp(kind: ChessPieceKind = "pawn"){
    return new ChessPiece(kind, "black")
}

function wp(kind: ChessPieceKind = "pawn"){
    return new ChessPiece(kind, "white")
}

export class Board {
    fields: Array<Array<ChessPiece | 0>> = [
        [bp("rook"), bp("knight"), bp("bishop"), bp("queen"), bp("king"), bp("bishop"), bp("knight"), bp("rook"),],
        [bp(), bp(), bp(), bp(), bp(), bp(), bp(), bp(),],
        [0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0,],
        [wp(), wp(), wp(), wp(), wp(), wp(), wp(), wp(),],
        [wp("rook"), wp("knight"), wp("bishop"), wp("queen"), wp("king"), wp("bishop"), wp("knight"), wp("rook"),],
    ];

    movePiece(from: { row: number, col: number }, to: { row: number, col: number }) {
        if (this.fields[from.row][from.col] === 0) {
            throw new Error('No piece at the source location');
        }
        const piece = this.fields[from.row][from.col] as ChessPiece;
        this.fields[to.row][to.col] = piece; // Move the piece to the new location
        this.fields[from.row][from.col] = 0; // Set the original location to empty
    }

     isMoveLegal(from: { row: number, col: number }, to: { row: number, col: number }): boolean {
        // Check if positions are within bounds
        if (!this.isWithinBounds(from) || !this.isWithinBounds(to)) return false;

        const sourcePiece = this.fields[from.row][from.col];
        const targetPiece = this.fields[to.row][to.col];

        // Check if there's a piece at the source location
        if (!sourcePiece) return false;

        // Check if the target is occupied by a piece of the same color
        if (targetPiece && targetPiece.player === sourcePiece.player) return false;

        // Delegate to specific piece rules
        switch (sourcePiece.kind) {
            case "pawn":
                return this.isPawnMoveLegal(sourcePiece, from, to, targetPiece);
            // Add other cases for other piece types
        }

        return false;
    }

    private isWithinBounds(position: { row: number, col: number }): boolean {
        return position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8;
    }

    private isPawnMoveLegal(pawn: ChessPiece, from: { row: number, col: number }, to: { row: number, col: number }, targetPiece: ChessPiece | 0): boolean {
        const direction = pawn.player === "white" ? 1 : -1;
        const initialRow = pawn.player === "white" ? 1 : 6;

        // Move forward one square
        if (from.col === to.col && to.row === from.row + direction && !targetPiece) {
            return true;
        }

        // Initial two-square move
        if (from.row === initialRow && from.col === to.col && to.row === from.row + 2 * direction && !targetPiece && !this.fields[from.row + direction][from.col]) {
            return true;
        }

        // Capture move
        if (Math.abs(to.col - from.col) === 1 && to.row === from.row + direction && targetPiece && targetPiece.player !== pawn.player) {
            return true;
        }

        // TODO: Add logic for "en passant"

        return false;
    }

    cloneWithNewFields(newFields: (ChessPiece | 0)[][]): Board {
        const newBoard = new Board();
        newBoard.fields = newFields;
        return newBoard;
    }
}

