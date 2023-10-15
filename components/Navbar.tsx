"use client";
import { Github, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex items-center justify-between p-4 sm:p-6 px-4 sm:px-10 max-w-8xl mx-auto w-full">
      <div className="flex items-center">
        <div className="cursor-pointer flex items-center">
          <Image
            src="/ayurvedalogo.png"
            alt=""
            width={40}
            height={40}
            className="mr-2 -mt-1"
          />

          <span className="logo text-black dark:text-emerald-50 font-semibold text-base sm:text-xl">
            AyurvedaGPT
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/Aaryan6"
          target="_blank"
          className="text-white mr-6"
        >
          <Github className="text-xl sm:text-2xl text-black dark:text-[#fff]" />
        </a>
        {theme === "dark" ? (
          <button
            className="text-xl sm:text-2xl text-black dark:text-[#fff]"
            onClick={toggleTheme}
          >
            <Sun />
          </button>
        ) : (
          <button
            className="text-xl sm:text-2xl text-black dark:text-[#fff]"
            onClick={toggleTheme}
          >
            <Moon />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
