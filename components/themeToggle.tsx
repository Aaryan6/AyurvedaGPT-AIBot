"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="text-xl sm:text-2xl text-black dark:text-[#fff]"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </button>
  );
}
