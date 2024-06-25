"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

export const ThemeToggle = () => {
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") setDarkMode(true);
   }, []);

   useEffect(() => {
      if (darkMode) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   }, [darkMode]);

   return (
      <Image
         onClick={() => setDarkMode(!darkMode)}
         className="cursor-pointer"
         alt="Sun"
         src="sun.svg"
         width={30}
         height={30}
      />
   );
};
