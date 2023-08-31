"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const icon =
    theme == "light" ? (
      <MdOutlineDarkMode
        onClick={() => setTheme("dark")}
        size={24}
        className="w-6 h-6 md:w-7 md:h-7"
      />
    ) : (
      <MdOutlineLightMode
        onClick={() => setTheme("light")}
        size={24}
        className="w-6 h-6 md:w-7 md:h-7"
      />
    );

  return <div className="flex">{icon}</div>;
};

export default ThemeSwitcher;
