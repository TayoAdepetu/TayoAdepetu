import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tayo Adepetu - Software Engineer",
  description: "Portfolio of Tayo Adepetu, a Top Rated Plus Software Engineer specializing in building meaningful products. Former content writer turned engineer, mentor to freelancers.",
  keywords: ["Tayo Adepetu", "Software Engineer", "Freelancer", "Upwork", "Web Development", "Next.js", "TypeScript"],
  authors: [{ name: "Tayo Adepetu" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tayoadepetu.com",
    siteName: "Tayo Adepetu",
    title: "Tayo Adepetu - Software Engineer",
    description: "Portfolio of Tayo Adepetu, a Top Rated Plus Software Engineer specializing in building meaningful products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayo Adepetu - Software Engineer",
    description: "Portfolio of Tayo Adepetu, a Top Rated Plus Software Engineer specializing in building meaningful products.",
    creator: "@tayoadepetu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>
          {children}
          <footer className="py-8 px-6 text-center text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
            <p>&copy; {new Date().getFullYear()} Tayo Adepetu. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
