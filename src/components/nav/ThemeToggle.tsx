"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

/**
 * Which icon shows is decided in CSS from the root data-theme attribute, so the
 * button renders correctly in the static HTML and never flashes the wrong state
 * or trips hydration. The click handler only flips the attribute and remembers it.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [label, setLabel] = useState("Switch colour theme");

  useEffect(() => {
    const read = () =>
      setLabel(
        document.documentElement.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
      );
    read();

    // Follow the system preference while the visitor has not chosen one.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        return;
      }
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
      read();
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just will not persist */
    }
    setLabel(next === "dark" ? "Switch to light theme" : "Switch to dark theme");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cx(
        "border-hair-strong text-ink hover:border-plum hover:text-plum flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        className,
      )}
    >
      <svg
        className="theme-icon-light"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.4" />
        <path d="M12 1.8v2.4M12 19.8v2.4M4.1 4.1l1.7 1.7M18.2 18.2l1.7 1.7M1.8 12h2.4M19.8 12h2.4M4.1 19.9l1.7-1.7M18.2 5.8l1.7-1.7" />
      </svg>
      <svg
        className="theme-icon-dark"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
      </svg>
    </button>
  );
}
