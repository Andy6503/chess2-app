'use client';
import React, { MouseEvent, useState } from "react";
import classes from './Chessboard.module.css';
import { Board } from '../utils/board'
import { ChessRules } from "../utils/ChessRules";
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
    const [currentPlayer, setCurrentPlayer] = useState("white");
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number; } | null>(null);
    const [dragging, setDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [gameStatus, setGameStatus] = useState("ongoing");

    
    /* const handleMove = (from: { row: number; col: number; }, to: { row: number; col: number; }) => {
        try {
            if (currentBoard.isMoveLegal(from, to)) {
                const newFields = currentBoard.fields.map(row => row.slice()); // Deep copy of fields array
                newFields[to.row][to.col] = newFields[from.row][from.col]; // Move the piece
                newFields[from.row][from.col] = 0; // Set the source to empty
    
                setCurrentBoard(currentBoard.cloneWithNewFields(newFields)); // Update state with a new Board instance
                togglePlayer();
                // checkGameStatus();
            } else {
                console.log("Illegal move attempt");
            }
        } catch (error) {
            console.error("Error moving piece:", error);
        }
    }; */

    // Function to handle clicking on a piece to make a move (NOT WORKING AS INTENDED YET)
    /* const handleSquareClick = (rowIndex: number, columnIndex: number) => {
        const clickedPosition = { row: rowIndex, col: columnIndex };
        const clickedPiece = currentBoard.fields[rowIndex][columnIndex];
    
        console.log(`Clicked position: (${rowIndex}, ${columnIndex}) with piece:`, clickedPiece);
    
        if (selectedPiece) {
            console.log(`Selected piece: from (${selectedPiece.row}, ${selectedPiece.col}) to (${rowIndex}, ${columnIndex})`);
            if (selectedPiece.row === rowIndex && selectedPiece.col === columnIndex) {
                setSelectedPiece(null);
                console.log("Deselected piece due to same square click.");
            } else {
                // Attempt to move the piece
                if (currentBoard.isMoveLegal(selectedPiece, clickedPosition)) {
                    console.log("Move is legal. Proceeding to move the piece.");
                    handleMove(selectedPiece, clickedPosition);
                    setSelectedPiece(null);
                } else {
                    console.log("Illegal move attempt.");
                    if (clickedPiece !== 0 && clickedPiece.player === currentPlayer) {
                        setSelectedPiece(clickedPosition);
                        console.log("Selected a new piece of the same player.");
                    }
                }
            }
        } else {
            if (clickedPiece !== 0 && clickedPiece.player === currentPlayer) {
                setSelectedPiece(clickedPosition);
                console.log("Piece selected:", clickedPosition);
            }
        }
    };*/
    
    
    const startDrag = (e: MouseEvent<HTMLDivElement>, rowIndex: number, columnIndex: number) => {
        e.preventDefault(); // Stop any default behavior, like text selection
        console.log("Mouse down on piece at:", rowIndex, columnIndex);
        setSelectedPiece({ row: rowIndex, col: columnIndex });
        setDragging(true);
        const pieceElement = e.target as HTMLDivElement;
    
        // Ensures right dimensions and initial position
        const rect = pieceElement.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
    
        setDragOffset({ x: offsetX, y: offsetY });
    
        setDragPosition({
            x: e.clientX - rect.width / 2,
            y: e.clientY - rect.height / 2
        });
    };
    
    // Handle movement of piece during drag
    const onDrag = (e: MouseEvent<HTMLDivElement>) => {
        if (dragging) {
            // Apply the stored offset to keep the piece centered
            setDragPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    // Handle the release of the piece
    const endDrag = (e: MouseEvent<HTMLDivElement>) => { // Adjust type if necessary
        if (dragging && selectedPiece) {
            // dropping logic here
            setDragging(false);
        }
    };
    

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
    };

    const checkGameStatus = () => {
        // Implement checks for conditions like check or checkmate
    };

   // Rendering board squares and pieces with click functionality
   return (
    <div className={classes.chessboardWrapper} onMouseMove={onDrag} onMouseUp={endDrag}>
        <div className={classes.chessboard}>
            {currentBoard.fields.map((boardRow, rowIndex) => {
                const isEven = rowIndex % 2 === 0;
                return boardRow.map((field, columnIndex) => {
                    const light = rowIndex % 2 !== columnIndex % 2;
                    const isSelected = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === columnIndex;

                    return (
                        <div 
                            className={`${classes.field} ${light ? classes.lightSquare : classes.darkSquare}`}
                            key={`${rowIndex}_${columnIndex}`}
                            onMouseDown={(e) => startDrag(e, rowIndex, columnIndex)}
                        >
                            {field !== 0 && <div 
                            className={classes.chesspiece}
                            style={isSelected && dragging ? {
                                left: `${dragPosition.x}px`,
                                top: `${dragPosition.y}px`,
                                opacity: 0.8,
                                width: '90px',  // Set the width to the size of the piece
                                height: '90px', // Set the height to the size of the piece
                                cursor: 'grabbing'
                            } : {}}
                        >
                                {field.kind === "pawn" && (field.player === "black" ? <Bpawn /> : <Wpawn />)}
                                {field.kind === "rook" && (field.player === "black" ? <Brook /> : <Wrook />)}
                                {field.kind === "knight" && (field.player === "black" ? <Bknight /> : <Wknight />)}
                                {field.kind === "bishop" && (field.player === "black" ? <Bbishop /> : <Wbishop />)}
                                {field.kind === "queen" && (field.player === "black" ? <Bqueen /> : <Wqueen />)}
                                {field.kind === "king" && (field.player === "black" ? <Bking /> : <Wking />)}
                            </div>}
                        </div>
                    );
                });
            })}
        </div>
    </div>
);
}