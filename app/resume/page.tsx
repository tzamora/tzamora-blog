import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume", description: "Resume for Tzamora." };

export default function ResumePage() {
  return (
    <section className="shell page-section resume">
      <p className="eyebrow">Work</p>
      <h1>Resume</h1>
      <p className="lede">A brief overview of my experience and interests.</p>
      <div className="resume-block">
        <h2>Experience</h2>
        <p>Add your roles, companies, and accomplishments here.</p>
      </div>
      <div className="resume-block">
        <h2>Skills</h2>
        <p>Add the tools and areas you work with here.</p>
      </div>
    </section>
  );
}
