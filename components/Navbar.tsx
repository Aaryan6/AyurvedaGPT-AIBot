"use client";
import { Github, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex items-center justify-between p-4 sm:p-6 px-4 sm:px-10 max-w-8xl mx-auto w-full">
      <div className="flex items-center">
        <div className="cursor-pointer flex items-center">
          {/* {theme === "dark" ? (
            <img src="/vectorlogo.svg" alt="" className="w-8 mr-2 -mt-1" />
          ) : (
            <img src="/vectorlogo2.svg" alt="" className="w-8 mr-2 -mt-1" />
          )} */}
          <span className="logo text-black dark:text-emerald-50 font-semibold text-base sm:text-xl">
            AyurvedaGPT
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/Aaryan6/AyurvedaGPT-react"
          target="_blank"
          rel="noopener noreferrer"
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
