import { ChessPiece, ChessPieceKind, PlayerType } from './ChessPiece';

export class ChessRules {
    static fields: any;
    static isWithinBounds(position: { row: number, col: number }): boolean {
        return position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8;
    }

    static isPawnMoveLegal(pawn: ChessPiece, from: { row: number, col: number }, to: { row: number, col: number }, targetPiece: ChessPiece | 0): boolean {
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
        return false;
    }

    static isRookMoveLegal(rook: ChessPiece, from: { row: number, col: number }, to: { row: number, col: number }, fields: Array<Array<ChessPiece | 0>>): boolean {
        // Check if the move is in a straight line
        if (from.row !== to.row && from.col !== to.col) {
            return false; // Rook moves must be strictly horizontal or vertical
        }
    
        const rowIncrement = from.row === to.row ? 0 : (to.row > from.row ? 1 : -1);
        const colIncrement = from.col === to.col ? 0 : (to.col > from.col ? 1 : -1);
    
        let currentRow = from.row + rowIncrement;
        let currentCol = from.col + colIncrement;
    
        // Check all squares between the start and end position (not including end position)
        while (currentRow !== to.row || currentCol !== to.col) {
            if (fields[currentRow][currentCol] !== 0) {
                return false; // There is a piece in the way
            }
            currentRow += rowIncrement;
            currentCol += colIncrement;
        }
    
        // The final position can be either empty or occupied by an opponent's piece (capture)
        const targetPiece = fields[to.row][to.col];
        if (targetPiece === 0) {
            return true; // The target square is empty
        } else {
            // Target square has a piece, check if it is an opponent's piece
            return targetPiece.player !== rook.player;
        }
    }
    
    
    
}



