import type { Metadata } from "next";
import { Marioloco } from "@/features/demos/marioloco/Marioloco";

export const metadata: Metadata = { title: "Marioloco", description: "A tiny original platform-jumping demo." };

export default function MariolocoPage() {
  return (
    <section className="shell page-section">
      <p className="eyebrow">Game demo</p>
      <h1>Marioloco</h1>
      <p className="lede">A small original platform scene. Jump on blocks, no scrolling needed.</p>
      <div className="demo-area"><Marioloco /></div>
    </section>
  );
}
