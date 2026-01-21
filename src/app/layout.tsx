import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            {/* Background elements for rich aesthetics */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

            <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
              <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Nomadic Blog
                </a>
                <div className="flex items-center gap-6">
                  <a href="/blog" className="text-sm font-medium hover:text-blue-400 transition-colors">Blog</a>
                  <a href="/about" className="text-sm font-medium hover:text-blue-400 transition-colors">About</a>
                </div>
              </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
