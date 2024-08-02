import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const font = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Realtime chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(font.variable, "min-h-screen bg-background font-sans antialiased")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
