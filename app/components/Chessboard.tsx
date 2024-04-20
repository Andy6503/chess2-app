'use client';
import { useState } from "react";
import classes from './Chessboard.module.css';
import { Board } from '../utils/board'
import Bpawn from "@/public/p-black.svg";
import Brook from "@/public/r-black.svg";
import Bknight from "@/public/n-black.svg";
import Bbishop from "@/public/b-black.svg";
import Bqueen from "@/public/q-black.svg";
import Bking from "@/public/k-black.svg";
import Wpawn from "@/public/P-white.svg";
import Wrook from "@/public/R-white.svg";
import Wknight from "@/public/N-white.svg";
import Wbishop from "@/public/B-white.svg";
import Wqueen from "@/public/Q-white.svg";
import Wking from "@/public/K-white.svg";


export function Chessboard() {
    const [currentBoard, setCurrentBoard] = useState (new Board());

    return <div className={classes.chessboardWrapper}>
            <div className={classes.chessboard}>

    {currentBoard.fields.map((boardRow, rowIndex) => {
        const isEven = rowIndex % 2 == 0;
        let light = !isEven;
        return boardRow.map((field /*either a ChessPiece or 0 */, columnIndex) => {
            light = !light;

            return <div className={classes.field + " " + (light ? classes.lightSquare : classes.darkSquare) } 
            key={`${rowIndex}_${columnIndex}`}>

                {field != 0 && <div className={classes.chesspiece}>
                    {field.kind === "pawn" && (field.player === "black" ? <Bpawn /> : <Wpawn />)}
                    {field.kind === "rook" && (field.player === "black" ? <Brook /> : <Wrook />)}
                    {field.kind === "knight" && (field.player === "black" ? <Bknight /> : <Wknight />)}
                    {field.kind === "bishop" && (field.player === "black" ? <Bbishop /> : <Wbishop />)}
                    {field.kind === "queen" && (field.player === "black" ? <Bqueen /> : <Wqueen />)}
                    {field.kind === "king" && (field.player === "black" ? <Bking /> : <Wking />)}
                    
                    </div>}
            </div>
        });
    })}
        </div>
    </div>
}