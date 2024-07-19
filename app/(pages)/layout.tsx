import "../globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

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
    <main className="flex flex-col w-full min-h-screen">
      <div className="flex-1 pb-12">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <main className="px-4 mx-auto md:px-6 prose-zinc">{children}</main>
        <ScrollToTop />
      </div>
      <Footer />
    </main>
  );
}
