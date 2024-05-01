import { ChessPiece, bp, wp } from './ChessPiece';
import { ChessRules } from './ChessRules';


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

