"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <SessionProvider>
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <HeroUIProvider navigate={router.push}>
                    {children}
                </HeroUIProvider>
            </NextThemesProvider>
        </SessionProvider>
    );
}
