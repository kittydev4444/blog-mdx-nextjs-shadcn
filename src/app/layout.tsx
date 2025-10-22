import { BuyMeCoffee } from "@/components/buy-me-coffee";
import { Header } from "@/components/header";
import { MDXHotReload } from "@/components/mdx-hmr";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kittydev-blog",
  description:
    "Sharing insights, tips, and tutorials on web development, Web3, and modern tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MDXHotReload />
        <Header />
        <main>{children}</main>
        <BuyMeCoffee />
      </body>
    </html>
  );
}
