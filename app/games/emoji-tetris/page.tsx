import type { Metadata } from "next";
import { EmojiTetris } from "@/features/demos/emoji-tetris/EmojiTetris";

export const metadata: Metadata = { title: "Emoji Tetris", description: "A tiny emoji block game." };

export default function EmojiTetrisPage() {
  return (
    <section className="shell page-section">
      <p className="eyebrow">Game demo</p>
      <h1>Emoji Tetris</h1>
      <p className="lede">A tiny falling-block game, made entirely from emoji.</p>
      <div className="demo-area"><EmojiTetris /></div>
    </section>
  );
}
