export type ChessPieceKind = 'pawn' | 'queen' | 'rook' | 'bishop' | 'knight' | 'king';
export type PlayerType = 'white' | 'black';

export class ChessPiece {
    constructor(public kind: ChessPieceKind, public player: PlayerType) {}
}

export function bp(kind: ChessPieceKind = "pawn"): ChessPiece {
    return new ChessPiece(kind, "black");
}

export function wp(kind: ChessPieceKind = "pawn"): ChessPiece {
    return new ChessPiece(kind, "white");
}