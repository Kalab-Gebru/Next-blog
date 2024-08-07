// "use client";
// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { MdOutlineLightMode } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";

// const ThemeSwitcher = () => {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   const icon =
//     theme == "light" ? (
//       <MdOutlineDarkMode
//         onClick={() => setTheme("dark")}
//         size={24}
//         className="w-6 h-6 md:w-7 md:h-7"
//       />
//     ) : (
//       <MdOutlineLightMode
//         onClick={() => setTheme("light")}
//         size={24}
//         className="w-6 h-6 md:w-7 md:h-7"
//       />
//     );

//   return <div className="flex">{icon}</div>;
// };

// export default ThemeSwitcher;

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
