import type { Metadata } from "next";
import { PitchControl } from "@/features/demos/pitch-control/PitchControl";

export const metadata: Metadata = {
  title: "Pitch Control",
  description: "A small Web Audio pitch control demo.",
};

export default function PitchControlPage() {
  return (
    <section className="shell page-section">
      <p className="eyebrow">Sound demo</p>
      <h1>Pitch Control</h1>
      <p className="lede">Start a tone, then use the slider to change its pitch.</p>
      <div className="demo-area"><PitchControl /></div>
    </section>
  );
}
