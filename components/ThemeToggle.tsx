"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as Theme | null;
    const activeTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";
    document.documentElement.dataset.theme = activeTheme;
    // Read the persisted browser preference once after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(activeTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${nextTheme} mode`}>
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span className="theme-toggle-label">{nextTheme}</span>
    </button>
  );
}
