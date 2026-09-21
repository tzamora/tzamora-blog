"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PitchControl.module.css";

const MIN_FREQUENCY = 80;
const MAX_FREQUENCY = 1_000;
const INITIAL_FREQUENCY = 220;
const paletteProperties = ["--bg", "--surface", "--text", "--muted", "--line", "--accent", "--accent-dark"] as const;

function paintPage(frequency: number) {
  const progress = (frequency - MIN_FREQUENCY) / (MAX_FREQUENCY - MIN_FREQUENCY);
  const hue = Math.round(260 - progress * 240); // low notes: violet/blue, high notes: orange/red
  const root = document.documentElement.style;
  root.setProperty("--bg", `hsl(${hue} 45% 8%)`);
  root.setProperty("--surface", `hsl(${hue} 35% 14%)`);
  root.setProperty("--text", `hsl(${hue} 35% 96%)`);
  root.setProperty("--muted", `hsl(${hue} 22% 72%)`);
  root.setProperty("--line", `hsl(${hue} 30% 29%)`);
  root.setProperty("--accent", `hsl(${hue} 92% 67%)`);
  root.setProperty("--accent-dark", `hsl(${hue} 100% 82%)`);
}

function restorePageColors() {
  const root = document.documentElement.style;
  paletteProperties.forEach((property) => root.removeProperty(property));
}

export function PitchControl() {
  const [frequency, setFrequency] = useState(INITIAL_FREQUENCY);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);

  function stopSound() {
    oscillator.current?.stop();
    oscillator.current?.disconnect();
    oscillator.current = null;
    void audioContext.current?.close();
    audioContext.current = null;
    setIsPlaying(false);
  }

  async function toggleSound() {
    if (isPlaying) {
      stopSound();
      return;
    }

    const context = new AudioContext();
    const tone = context.createOscillator();
    const gain = context.createGain();
    tone.type = "sine";
    tone.frequency.value = frequency;
    gain.gain.value = 0.08;
    tone.connect(gain).connect(context.destination);
    tone.start();
    audioContext.current = context;
    oscillator.current = tone;
    setIsPlaying(true);
  }

  function changePitch(nextFrequency: number) {
    setFrequency(nextFrequency);
    paintPage(nextFrequency);
    oscillator.current?.frequency.setTargetAtTime(nextFrequency, audioContext.current?.currentTime ?? 0, 0.015);
  }

  useEffect(() => () => {
    oscillator.current?.stop();
    oscillator.current?.disconnect();
    void audioContext.current?.close();
    restorePageColors();
  }, []);

  return (
    <div className={styles.demo}>
      <p className={styles.status} aria-live="polite">{isPlaying ? "Playing" : "Stopped"}</p>
      <button className={styles.button} type="button" onClick={() => void toggleSound()}>
        {isPlaying ? "Stop sound" : "Play sound"}
      </button>
      <label className={styles.pitch} htmlFor="pitch">
        <span>Pitch <output htmlFor="pitch">{frequency} Hz</output></span>
        <input
          id="pitch"
          type="range"
          min={MIN_FREQUENCY}
          max={MAX_FREQUENCY}
          value={frequency}
          onChange={(event) => changePitch(Number(event.target.value))}
        />
        <small>Low</small><small>High</small>
      </label>
    </div>
  );
}
