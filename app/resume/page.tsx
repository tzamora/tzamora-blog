import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume", description: "Resume for Antonio Zamora." };

export default function ResumePage() {
  return (
    <section className="shell page-section resume">
      <p className="eyebrow">Work</p>
      <h1>Antonio Zamora</h1>
      <p className="lede">Software engineer. Like a lot using LLMs tech to do programming but sick of people using it to the point they get brain rot</p>

      <div className="resume-block">
        <h2>Working principles</h2>
        <ul>
          <li>Speed. As speed increase more safeguards are needed.</li>
          <li>Hate ai generated documentation. Prefer concise, useful documentation over large collections of files that create noise.</li>
          <li>Using ai is like a slot machine with domapine bursts. Control and focus is a skill I try to push.</li>
          <li>Stay engaged, think critically, and do the work instead of letting tools replace judgment.</li>
        </ul>
      </div>

      <div className="resume-block">
        <h2>Skills</h2>
        <p>Systems design and communication skills; good at putting expert talk in layman&apos;s terms.</p>
      </div>

      <div className="resume-block">
        <h2>Links</h2>
        <div className="social-links">
          <a href="https://github.com/tzamora" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.54 1.05 1.54 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.91c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.92-2.35 4.78-4.58 5.03.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" /></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/tzamora/" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.05 18.9H5.1V9.4h2.95v9.5ZM6.57 8.1a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM18.9 18.9h-2.94v-4.62c0-1.1-.02-2.52-1.53-2.52-1.54 0-1.78 1.2-1.78 2.44v4.7H9.71V9.4h2.82v1.3h.04c.39-.74 1.35-1.53 2.78-1.53 2.97 0 3.52 1.96 3.52 4.51v5.22Z" /></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
