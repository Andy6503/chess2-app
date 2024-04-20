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
}