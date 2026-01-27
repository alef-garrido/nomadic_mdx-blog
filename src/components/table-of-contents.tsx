"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface Heading {
    text: string;
    level: number;
    id: string;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-24 max-h-[calc(100vh-120px)] overflow-auto py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4 px-4">
                On this page
            </p>
            <ul className="space-y-1 border-l border-white/5 ml-4">
                {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}>
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block py-1 pr-4 text-sm transition-all duration-200 border-l -ml-px",
                                activeId === heading.id
                                    ? "border-blue-500 text-blue-400 font-medium"
                                    : "border-transparent text-foreground/50 hover:text-foreground/80"
                            )}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
