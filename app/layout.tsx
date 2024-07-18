import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TProvider from "@/context/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalab's Blog",
  description: "Created by Kalab Gebru",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col justify-between min-h-screen`}
      >
        <TProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </TProvider>
      </body>
    </html>
  );
}
