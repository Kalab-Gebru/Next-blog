import "./globals.css";
import BlogNavbar from "./components/BlogNavbar";
import type { Metadata } from "next";
import AuthProvider from "./context/AuthProvider";

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
      <body className="bg-gray-100">
        <AuthProvider>
          <BlogNavbar />
          <main className="px-4 mx-auto md:px-6 prose-slate">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
