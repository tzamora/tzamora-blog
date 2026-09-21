"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Marioloco.module.css";

const SIZE = 480;
const playerStart = { x: 44, y: 380, vx: 0, vy: 0, grounded: false };
const coinsStart = [
  { x: 136, y: 307, collected: false },
  { x: 306, y: 317, collected: false },
  { x: 198, y: 219, collected: false },
  { x: 332, y: 187, collected: false },
  { x: 118, y: 122, collected: false },
];
const platforms = [
  { x: 0, y: 434, width: 480, height: 46 },
  { x: 84, y: 345, width: 105, height: 18 },
  { x: 258, y: 355, width: 120, height: 18 },
  { x: 176, y: 257, width: 92, height: 18 },
  { x: 280, y: 225, width: 120, height: 18 },
  { x: 62, y: 160, width: 116, height: 18 },
];
const spikes = [
  { x: 226, y: 243, width: 22, height: 14 },
  { x: 406, y: 420, width: 30, height: 14 },
];

const keys = new Set<string>();
type Player = typeof playerStart;

function drawScene(context: CanvasRenderingContext2D, player: Player, coins: typeof coinsStart, worldAngle: number | null = null) {
  const sky = context.createLinearGradient(0, 0, 0, SIZE);
  sky.addColorStop(0, "#6bd5ff");
  sky.addColorStop(1, "#f4d278");
  context.fillStyle = sky;
  context.fillRect(0, 0, SIZE, SIZE);

  context.fillStyle = "rgb(255 255 255 / 0.65)";
  [[64, 82], [296, 62], [386, 120]].forEach(([x, y]) => {
    context.beginPath(); context.arc(x, y, 24, 0, Math.PI * 2); context.arc(x + 26, y - 8, 30, 0, Math.PI * 2); context.arc(x + 54, y, 20, 0, Math.PI * 2); context.fill();
  });

  platforms.forEach((platform) => {
    context.fillStyle = "#7d3e21";
    context.fillRect(platform.x, platform.y, platform.width, platform.height);
    context.fillStyle = "#42a85b";
    context.fillRect(platform.x, platform.y, platform.width, 7);
    context.fillStyle = "rgb(255 220 132 / 0.2)";
    context.fillRect(platform.x + 6, platform.y + 11, platform.width - 12, 3);
  });

  spikes.forEach((spike) => {
    context.fillStyle = "#e9eef7";
    for (let x = spike.x; x < spike.x + spike.width; x += 10) {
      context.beginPath(); context.moveTo(x, spike.y + spike.height); context.lineTo(x + 5, spike.y); context.lineTo(x + 10, spike.y + spike.height); context.fill();
    }
  });

  coins.filter((coin) => !coin.collected).forEach((coin) => {
    context.fillStyle = "#ffcb3d";
    context.beginPath(); context.arc(coin.x, coin.y, 10, 0, Math.PI * 2); context.fill();
    context.fillStyle = "#fff19c";
    context.beginPath(); context.arc(coin.x - 3, coin.y - 3, 3, 0, Math.PI * 2); context.fill();
    context.strokeStyle = "#c77c16"; context.lineWidth = 2;
    context.beginPath(); context.arc(coin.x, coin.y, 7, 0, Math.PI * 2); context.stroke();
  });

  // Marioloco: an original tiny red-capped explorer, not a borrowed game asset.
  const x = Math.round(player.x); const y = Math.round(player.y);
  context.fillStyle = "rgb(0 0 0 / 0.25)";
  context.beginPath(); context.ellipse(x + 14, y + 31, 16, 4, 0, 0, Math.PI * 2); context.fill();
  context.fillStyle = "#df3d3d";
  context.fillRect(x + 3, y, 22, 7); context.fillRect(x + 7, y - 4, 14, 5);
  context.fillStyle = "#f0b27a";
  context.fillRect(x + 7, y + 7, 14, 12);
  context.fillStyle = "#182958";
  context.fillRect(x + 5, y + 19, 18, 10);
  context.fillStyle = "#ffffff";
  context.fillRect(x + 16, y + 10, 3, 3);
  context.fillStyle = "#3d221b";
  context.fillRect(x + 4, y + 29, 7, 4); context.fillRect(x + 18, y + 29, 7, 4);

  if (worldAngle !== null) {
    const characters = ".:+*#@";
    const radius = 84;
    context.save();
    context.translate(SIZE / 2, SIZE / 2);
    context.font = "14px ui-monospace, monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    for (let latitude = -1.35; latitude <= 1.35; latitude += 0.24) {
      for (let longitude = 0; longitude < Math.PI * 2; longitude += 0.19) {
        const x = Math.cos(latitude) * Math.cos(longitude + worldAngle);
        const y = Math.sin(latitude);
        const z = Math.cos(latitude) * Math.sin(longitude + worldAngle);
        const depth = (z + 1) / 2;
        context.globalAlpha = 0.18 + depth * 0.82;
        context.fillStyle = depth > 0.55 ? "#ffdb5c" : "#563e9e";
        context.fillText(characters[Math.floor(depth * (characters.length - 1))], x * radius, y * radius);
      }
    }
    context.globalAlpha = 1;
    context.fillStyle = "#fff4b5";
    context.font = "bold 15px ui-monospace, monospace";
    context.fillText("MARIOLOCO", 0, 0);
    context.restore();
  }
}

export function Marioloco() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Player>({ ...playerStart });
  const coinsRef = useRef(coinsStart.map((coin) => ({ ...coin })));
  const audioRef = useRef<AudioContext | null>(null);
  const allCoinsCollected = useRef(false);
  const worldShown = useRef(false);
  const [running, setRunning] = useState(false);
  const [collected, setCollected] = useState(0);
  const [won, setWon] = useState(false);

  async function start() {
    if (!audioRef.current) audioRef.current = new AudioContext();
    await audioRef.current.resume();
    setRunning((value) => !value);
  }

  function quack() {
    const context = audioRef.current;
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(620, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(220, context.currentTime + 0.16);
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.11, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.19);
  }

  function reset() {
    playerRef.current = { ...playerStart };
    coinsRef.current = coinsStart.map((coin) => ({ ...coin }));
    setCollected(0);
    setWon(false);
    allCoinsCollected.current = false;
    worldShown.current = false;
    setRunning(false);
    const context = canvasRef.current?.getContext("2d");
    if (context) drawScene(context, playerRef.current, coinsRef.current);
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const drawingContext = context;
    if (!running) { drawScene(drawingContext, playerRef.current, coinsRef.current); return; }

    let frame = 0;
    let lastTime = 0;
    function update(time: number) {
      const dt = Math.min((time - lastTime) / 1000 || 0, 0.035);
      lastTime = time;
      const player = playerRef.current;
      const direction = keys.has("ArrowLeft") || keys.has("a") ? -1 : keys.has("ArrowRight") || keys.has("d") ? 1 : 0;
      player.vx += (direction * 190 - player.vx) * Math.min(1, 14 * dt);
      if ((keys.has("ArrowUp") || keys.has("w") || keys.has(" ")) && player.grounded) { player.vy = -600; player.grounded = false; }
      const previousBottom = player.y + 33;
      player.x = Math.max(0, Math.min(SIZE - 28, player.x + player.vx * dt));
      player.vy += 1_450 * dt;
      player.y += player.vy * dt;
      player.grounded = false;
      platforms.forEach((platform) => {
        const landsOnPlatform = player.vy >= 0 && previousBottom <= platform.y && player.y + 33 >= platform.y && player.x + 25 > platform.x && player.x < platform.x + platform.width;
        if (landsOnPlatform) { player.y = platform.y - 33; player.vy = 0; player.grounded = true; }
      });
      const hitSpike = spikes.some((spike) => player.x + 25 > spike.x && player.x < spike.x + spike.width && player.y + 33 > spike.y + 3 && player.y < spike.y + spike.height);
      if (hitSpike) {
        playerRef.current = { ...playerStart };
        drawScene(drawingContext, playerRef.current, coinsRef.current, worldShown.current ? time / 2_400 : null);
        frame = requestAnimationFrame(update);
        return;
      }
      coinsRef.current.forEach((coin) => {
        const touchesCoin = !coin.collected && player.x + 28 > coin.x - 10 && player.x < coin.x + 10 && player.y + 33 > coin.y - 10 && player.y < coin.y + 10;
        if (touchesCoin) { coin.collected = true; setCollected((value) => value + 1); quack(); }
      });
      if (!allCoinsCollected.current && coinsRef.current.every((coin) => coin.collected)) {
        allCoinsCollected.current = true;
        setWon(true);
      }
      const nearRightCloud = player.x + 14 > 370 && player.y < 190;
      if (allCoinsCollected.current && nearRightCloud) worldShown.current = true;
      drawScene(drawingContext, player, coinsRef.current, worldShown.current ? time / 2_400 : null);
      frame = requestAnimationFrame(update);
    }
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  useEffect(() => () => { void audioRef.current?.close(); }, []);

  useEffect(() => {
    function keyDown(event: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "a", "d", "w"].includes(event.key)) { event.preventDefault(); keys.add(event.key); }
    }
    function keyUp(event: KeyboardEvent) { keys.delete(event.key); }
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => { window.removeEventListener("keydown", keyDown); window.removeEventListener("keyup", keyUp); keys.clear(); };
  }, []);

  return (
    <div className={styles.game}>
      <div className={styles.status}>{won ? "All coins! ✨" : `Coins: ${collected} / ${coinsStart.length}`}</div>
      <canvas ref={canvasRef} className={styles.canvas} width={SIZE} height={SIZE} aria-label="Marioloco platform jumping game" />
      <div className={styles.actions}>
        <button type="button" onClick={() => void start()}>{running ? "Pause" : "Start"}</button>
        <button type="button" className={styles.secondary} onClick={reset}>Reset</button>
      </div>
      <div className={styles.controls}>
        <button type="button" onPointerDown={() => keys.add("ArrowLeft")} onPointerUp={() => keys.delete("ArrowLeft")} onPointerLeave={() => keys.delete("ArrowLeft")}>←</button>
        <button type="button" onPointerDown={() => keys.add("ArrowUp")} onPointerUp={() => keys.delete("ArrowUp")} onPointerLeave={() => keys.delete("ArrowUp")}>Jump</button>
        <button type="button" onPointerDown={() => keys.add("ArrowRight")} onPointerUp={() => keys.delete("ArrowRight")} onPointerLeave={() => keys.delete("ArrowRight")}>→</button>
      </div>
      <p>Use arrow keys or A / D / W. No scrolling—just jump around.</p>
    </div>
  );
}
