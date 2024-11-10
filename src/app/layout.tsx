import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Calendly Clone",
  description: "A scheduling automation app",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "antialiased min-h-screen bg-background font-sans",
            inter.variable,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
