import React, { HTMLAttributes } from "react";
import Link from "next/link";
import { Snippet } from "./ui/Snippet";
import { Code } from "./ui/Code";
import { Button } from "./ui/Button";

type MDXComponentProps = HTMLAttributes<HTMLElement>;

interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
    href?: string;
}

export const mdxComponents = {
    h1: (props: MDXComponentProps) => (
        <h1 className="text-4xl font-bold mt-8 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-serif" {...props} />
    ),
    h2: (props: MDXComponentProps) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground/90 border-b border-white/10 pb-2 font-serif" {...props} />,
    h3: (props: MDXComponentProps) => <h3 className="text-xl font-medium mt-4 mb-2 text-foreground/80 font-serif" {...props} />,
    p: (props: MDXComponentProps) => <p className="leading-relaxed mb-4 text-foreground/70 font-mono" {...props} />,
    ul: (props: MDXComponentProps) => <ul className="list-disc list-inside mb-4 space-y-1 text-foreground/70 font-mono" {...props} />,
    ol: (props: MDXComponentProps) => <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground/70 font-mono" {...props} />,
    li: (props: MDXComponentProps) => <li className="ml-4" {...props} />,
    a: ({ href, ...props }: AnchorProps) => {
        const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));
        if (isInternalLink) {
            return (
                <Link href={href} className="text-blue-500 hover:text-blue-400 underline transition-colors" {...(props as HTMLAttributes<HTMLAnchorElement>)} />
            );
        }
        return (
            <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 underline transition-colors"
                href={href}
                {...props}
            />
        );
    },
    pre: (props: MDXComponentProps) => (
        <pre className="relative rounded-lg bg-zinc-900 p-4 overflow-x-auto my-6 border border-white/5 font-mono" {...props} />
    ),
    code: (props: MDXComponentProps) => <code className="bg-zinc-800 rounded px-1.5 py-0.5 text-sm font-mono" {...props} />,
    Snippet,
    Code,
    Button,
};
