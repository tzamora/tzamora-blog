"use client";

import { useEffect, useReducer } from "react";
import styles from "./EmojiTetris.module.css";

const WIDTH = 10;
const HEIGHT = 20;
type Cell = string | null;
type Point = [number, number];
type Piece = { shape: Point[]; emoji: string; x: number; y: number };

type Game = { board: Cell[][]; active: Piece; sequence: number; emojiOffset: number; score: number; playing: boolean; gameOver: boolean };

type Action = { type: "START" | "PAUSE" | "RESET" | "TICK" | "LEFT" | "RIGHT" | "ROTATE" | "DROP" };

const pieces = [
  { emoji: "🟦", shape: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { emoji: "🟨", shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { emoji: "🟪", shape: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  { emoji: "🟩", shape: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  { emoji: "🟥", shape: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { emoji: "🟧", shape: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  { emoji: "🟫", shape: [[2, 0], [0, 1], [1, 1], [2, 1]] },
] as const;

const emojis = ["🦄", "🍄", "👾", "🌈", "🛸", "🧠", "🦖", "🍕", "⚡", "🌻"];
const emptyBoard = () => Array.from({ length: HEIGHT }, () => Array<Cell>(WIDTH).fill(null));

function newPiece(sequence: number, emojiOffset: number): Piece {
  const source = pieces[sequence % pieces.length];
  return { ...source, emoji: emojis[(sequence + emojiOffset) % emojis.length], shape: source.shape.map(([x, y]) => [x, y]), x: 3, y: 0 };
}

function newGame(emojiOffset = 0): Game {
  return { board: emptyBoard(), active: newPiece(0, emojiOffset), sequence: 1, emojiOffset, score: 0, playing: false, gameOver: false };
}

function collides(board: Cell[][], piece: Piece) {
  return piece.shape.some(([dx, dy]) => {
    const x = piece.x + dx;
    const y = piece.y + dy;
    return x < 0 || x >= WIDTH || y >= HEIGHT || (y >= 0 && board[y][x] !== null);
  });
}

function rotate(piece: Piece): Piece {
  const rotated = piece.shape.map(([x, y]) => [-y, x] as Point);
  const minX = Math.min(...rotated.map(([x]) => x));
  const minY = Math.min(...rotated.map(([, y]) => y));
  return { ...piece, shape: rotated.map(([x, y]) => [x - minX, y - minY]) };
}

function settle(game: Game): Game {
  const board = game.board.map((row) => [...row]);
  game.active.shape.forEach(([dx, dy]) => { board[game.active.y + dy][game.active.x + dx] = game.active.emoji; });
  const keptRows = board.filter((row) => row.some((cell) => cell === null));
  const lines = HEIGHT - keptRows.length;
  while (keptRows.length < HEIGHT) keptRows.unshift(Array<Cell>(WIDTH).fill(null));
  const active = newPiece(game.sequence, game.emojiOffset);
  const next = { ...game, board: keptRows, active, sequence: game.sequence + 1, score: game.score + lines * 100 };
  return collides(keptRows, active) ? { ...next, playing: false, gameOver: true } : next;
}

function moveDown(game: Game) {
  const active = { ...game.active, y: game.active.y + 1 };
  return collides(game.board, active) ? settle(game) : { ...game, active };
}

function gameReducer(game: Game, action: Action): Game {
  if (action.type === "RESET") return newGame((game.emojiOffset + 1 + Math.floor(Math.random() * (emojis.length - 1))) % emojis.length);
  if (action.type === "START") return { ...game, playing: true, gameOver: false };
  if (action.type === "PAUSE") return { ...game, playing: false };
  if (!game.playing) return game;
  if (action.type === "TICK" || action.type === "DROP") return moveDown(game);

  if (action.type === "ROTATE") {
    const active = rotate(game.active);
    return collides(game.board, active) ? game : { ...game, active };
  }
  const active = { ...game.active, x: game.active.x + (action.type === "LEFT" ? -1 : 1) };
  return collides(game.board, active) ? game : { ...game, active };
}

export function EmojiTetris() {
  const [game, dispatch] = useReducer(gameReducer, undefined, newGame);

  useEffect(() => {
    if (!game.playing) return;
    const interval = window.setInterval(() => dispatch({ type: "TICK" }), 550);
    return () => window.clearInterval(interval);
  }, [game.playing]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const keys: Record<string, Action["type"]> = { ArrowLeft: "LEFT", ArrowRight: "RIGHT", ArrowUp: "ROTATE", ArrowDown: "DROP", " ": "PAUSE" };
      const action = keys[event.key];
      if (!action) return;
      event.preventDefault();
      dispatch({ type: action });
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeCells = new Map(game.active.shape.map(([x, y]) => [`${game.active.x + x},${game.active.y + y}`, game.active.emoji]));

  return (
    <div className={styles.game}>
      <div className={styles.topbar}><span>Score: {game.score}</span><span>{game.gameOver ? "Game over" : game.playing ? "Playing" : "Ready"}</span></div>
      <div className={styles.board} role="grid" aria-label="Emoji block game board">
        {game.board.flatMap((row, y) => row.map((cell, x) => <div className={styles.cell} role="gridcell" key={`${x}-${y}`}>{activeCells.get(`${x},${y}`) || cell}</div>))}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => dispatch({ type: game.playing ? "PAUSE" : "START" })}>{game.playing ? "Pause" : game.gameOver ? "Play again" : "Start"}</button>
        <button type="button" className={styles.secondary} onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      </div>
      <div className={styles.controls} aria-label="Game controls">
        <button type="button" onClick={() => dispatch({ type: "LEFT" })}>←</button>
        <button type="button" onClick={() => dispatch({ type: "ROTATE" })}>↻</button>
        <button type="button" onClick={() => dispatch({ type: "RIGHT" })}>→</button>
        <button type="button" onClick={() => dispatch({ type: "DROP" })}>↓</button>
      </div>
      <p className={styles.help}>Arrow keys or buttons to move · up rotates · space pauses</p>
    </div>
  );
}
