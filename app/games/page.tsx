import type { Metadata } from "next";

export const metadata: Metadata = { title: "Games", description: "Games and experiments by Tzamora." };

export default function GamesPage() {
  return (
    <section className="shell page-section">
      <p className="eyebrow">Projects</p>
      <h1>Games</h1>
      <p className="lede">A home for small games, prototypes, and playful experiments.</p>
      <div className="empty-state"><p>First game coming soon.</p></div>
    </section>
  );
}
