import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./context/AuthProvider";
import TProvider from "./context/ThemeProvider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

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
        className={`${inter.className} flex flex-col justify-between min-h-screen bg-white dark:bg-slate-900`}
      >
        <TProvider>
          <AuthProvider>
            <div className="pb-12">
              <Navbar />
              <Toaster position="top-center" reverseOrder={false} />
              <main className="px-4 mx-auto md:px-6 prose-slate">
                {children}
              </main>
              <ScrollToTop />
            </div>
            <Footer />
          </AuthProvider>
        </TProvider>
      </body>
    </html>
  );
}
