import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppNavbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nomadic MDX Blog",
  description: "A modern blog built with Next.js and MDX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-300`}>
        <Providers>
          <div className="relative min-h-screen">
            {/* Background elements for rich aesthetics */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

            <AppNavbar />

            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
