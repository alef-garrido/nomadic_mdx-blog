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
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FaThreads } from "react-icons/fa6";
import { LuLock, LuUser } from "react-icons/lu";

export function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();
    const isAuthorized = !!session?.user;

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
                        <Image
                            src="/logo.svg"
                            alt="nomad_proxy logo"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <p className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-display font-bold">
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
                            className={`text-sm font-medium transition-colors hover:text-blue-400 font-mono ${pathname === item.href ? "text-blue-400" : "text-foreground"
                                }`}
                        >
                            {item.name}
                        </NextLink>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2">
                <ThemeSwitcher />
                <HeroLink
                    isExternal
                    href="https://threads.net"
                    className="text-foreground/60 hover:text-foreground p-2"
                >
                    <FaThreads className="w-5 h-5" />
                </HeroLink>
                <HeroLink
                    as={NextLink}
                    href={isAuthorized ? "/admin" : "/login"}
                    className="text-foreground/60 hover:text-foreground p-2 transition-colors"
                    title={isAuthorized ? "Admin Dashboard" : "Login"}
                >
                    {isAuthorized ? (
                        <LuUser className="w-5 h-5 text-blue-400" />
                    ) : (
                        <LuLock className="w-5 h-5" />
                    )}
                </HeroLink>
            </NavbarContent>

            <NavbarMenu className="bg-background/80 backdrop-blur-md pt-6 h-screen flex flex-col items-center justify-center">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <NextLink
                            className="text-5xl py-6 font-mono text-center uppercase"
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
