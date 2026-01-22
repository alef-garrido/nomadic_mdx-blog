import React from "react";
import Link from "next/link";
import { Copy } from "lucide-react";

export const mdxComponents = {
    h1: (props: any) => (
        <h1 className="text-4xl font-bold mt-8 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent" {...props} />
    ),
    h2: (props: any) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground/90 border-b border-white/10 pb-2" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-medium mt-4 mb-2 text-foreground/80" {...props} />,
    p: (props: any) => <p className="leading-relaxed mb-4 text-foreground/70" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-1 text-foreground/70" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground/70" {...props} />,
    li: (props: any) => <li className="ml-4" {...props} />,
    a: ({ href, ...props }: any) => {
        const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));
        if (isInternalLink) {
            return (
                <Link href={href} className="text-blue-500 hover:text-blue-400 underline transition-colors" {...props} />
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
    pre: (props: any) => (
        <pre className="relative rounded-lg bg-zinc-900 p-4 overflow-x-auto my-6 border border-white/5" {...props} />
    ),
    code: (props: any) => <code className="bg-zinc-800 rounded px-1.5 py-0.5 text-sm font-mono" {...props} />,
};
