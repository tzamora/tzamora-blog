import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Games & Demos", description: "Small games and experiments by Tzamora." };

export default function GamesPage() {
  return (
    <section className="shell page-section">
      <p className="eyebrow">Projects</p>
      <h1>Games & Demos</h1>
      <p className="lede">Small, self-contained experiments. Each can grow into its own project when it needs to.</p>
      <div className="demo-list">
        <article className="demo-card">
          <div className="demo-card-content">
            <p className="eyebrow">Game</p>
            <h2><Link href="/games/marioloco">Marioloco</Link></h2>
            <p>A small, no-scroll platform scene: jump on blocks and explore.</p>
            <Link className="show-more" href="/games/marioloco">Open game <span aria-hidden="true">→</span></Link>
          </div>
          <Link className="demo-thumbnail" href="/games/marioloco" aria-label="Open Marioloco"><Image src="/images/marioloco-thumb.svg" alt="" width={360} height={240} /></Link>
        </article>
        <article className="demo-card">
          <div className="demo-card-content">
            <p className="eyebrow">Game</p>
            <h2><Link href="/games/emoji-tetris">Emoji Tetris</Link></h2>
            <p>A tiny falling-block game made entirely from emoji.</p>
            <Link className="show-more" href="/games/emoji-tetris">Open game <span aria-hidden="true">→</span></Link>
          </div>
          <Link className="demo-thumbnail" href="/games/emoji-tetris" aria-label="Open Emoji Tetris"><Image src="/images/emoji-tetris-thumb.svg" alt="" width={360} height={240} /></Link>
        </article>
        <article className="demo-card">
          <div className="demo-card-content">
            <p className="eyebrow">Web Audio</p>
            <h2><Link href="/games/pitch-control">Pitch Control</Link></h2>
            <p>Start and stop a tone, then control its frequency with a slider.</p>
            <Link className="show-more" href="/games/pitch-control">Open demo <span aria-hidden="true">→</span></Link>
          </div>
          <Link className="demo-thumbnail" href="/games/pitch-control" aria-label="Open Pitch Control"><Image src="/images/pitch-control-thumb.svg" alt="" width={360} height={240} /></Link>
        </article>
      </div>
    </section>
  );
}
