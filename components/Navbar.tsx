"use client";
import { Github } from "lucide-react";
import Image from "next/image";

import { Outfit } from "next/font/google";
import { ThemeToggle } from "./themeToggle";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 sm:p-6 px-4 sm:px-10 max-w-8xl mx-auto w-full">
      <div className="flex items-center">
        <div className="cursor-pointer flex items-center">
          <Image
            src="/ayurvedalogo.png"
            alt=""
            width={351}
            height={351}
            className="w-10 mr-2 h-auto aspect-square"
          />

          <span
            className={`${outfit.className} logo text-black dark:text-emerald-50 font-semibold text-base sm:text-xl`}
          >
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
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
