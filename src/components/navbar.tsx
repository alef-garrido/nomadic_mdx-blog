"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link as HeroLink,
} from "@heroui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { FaThreads } from "react-icons/fa6";

export function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Club", href: "/club" },
    ];

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="xl"
            isBordered
            className="bg-background/60 backdrop-blur-md"
        >

            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <NextLink href="/" className="flex items-center gap-2">
                        <p className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            nomad_proxy
                        </p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item.name} isActive={pathname === item.href}>
                        <NextLink
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-400 ${pathname === item.href ? "text-blue-400" : "text-foreground"
                                }`}
                        >
                            {item.name}
                        </NextLink>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2">
                <HeroLink
                    isExternal
                    href="https://threads.net"
                    className="text-foreground/60 hover:text-foreground p-2"
                >
                    <FaThreads className="w-5 h-5" />
                </HeroLink>
                <ThemeSwitcher />
            </NavbarContent>

            <NavbarMenu className="bg-background/80 backdrop-blur-md pt-6">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <NextLink
                            className="w-full text-lg py-2"
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </NextLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
