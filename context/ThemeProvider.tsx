"use client";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function TProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
