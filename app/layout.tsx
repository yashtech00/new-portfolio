import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yash Gupta — Full-Stack Developer & Analyst",
  description:
    "Portfolio of Yash Gupta, Full-Stack Developer & Analyst specializing in scalable systems, AI-driven applications, and modern web engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth bg-[#fcf9f3]"
      style={{ backgroundColor: "#fcf9f3", color: "#1c1c18" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased selection:bg-[#0e8f8b]/20 bg-[#fcf9f3] text-[#1c1c18] min-h-screen`}
        style={{ backgroundColor: "#fcf9f3", color: "#1c1c18" }}
      >
        {children}
      </body>
    </html>
  );
}
