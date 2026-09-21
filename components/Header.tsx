import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/games", label: "Games" },
  { href: "/resume", label: "Resume" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Tzamora home">
          tzamora<span>.</span>
        </Link>
        <div className="header-actions">
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
