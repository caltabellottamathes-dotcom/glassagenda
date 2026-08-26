import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-marble/30 bg-marble/10 backdrop-blur-md text-storm text-xs hover:bg-marble/20 transition-colors"
      aria-label="Wissel thema"
    >
      {mounted && (isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
      <span className="tracking-wide">{mounted ? (isDark ? "Light" : "Dark") : "Thema"}</span>
    </button>
  );
}