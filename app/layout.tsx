import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

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
  title: "Yash Gupta — Full-Stack Engineer & AI Developer",
  description:
    "Portfolio of Yash Gupta, a full-stack engineer building web applications, backend systems, AI-powered products, and production software.",
  openGraph: {
    title: "Yash Gupta — Full-Stack Engineer & AI Developer",
    description:
      "Full-stack engineer building web applications, backend systems, AI workflows, and scalable production software.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Gupta — Full-Stack Engineer & AI Developer",
    description:
      "Full-stack engineer building web applications, backend systems, AI workflows, and scalable production software.",
    creator: "@yashgtech00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased selection:bg-[var(--teal)]/20 bg-[var(--surface)] text-[var(--on-surface)] min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
