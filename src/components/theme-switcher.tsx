"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            isIconOnly
            variant="light"
            radius="full"
            size="sm"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="text-foreground/60 hover:text-foreground hover:bg-white/10"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 transition-all duration-300" />
            ) : (
                <Moon className="w-5 h-5 transition-all duration-300" />
            )}
        </Button>
    );
}
