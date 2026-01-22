"use client";

import Link from "next/link";
import { Button, Link as HeroLink } from "@heroui/react";
import { ArrowRight, BookOpen, Cpu, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center">
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next.js 15 + MDX Remote
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
          Write once, <br />
          <span className="bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Scale anywhere.
          </span>
        </h1>

        <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
          A high-performance blog engine built for developers.
          Powered by MDX Remote for ultimate flexibility and Tailwind v4 for stunning aesthetics.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <Button
            as={Link}
            href="/blog"
            color="primary"
            variant="shadow"
            size="lg"
            radius="full"
            className="font-bold py-7 px-10"
            endContent={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          >
            Start Reading
          </Button>
          <Button
            as={HeroLink}
            href="https://github.com"
            variant="bordered"
            size="lg"
            radius="full"
            className="font-bold py-7 px-10 border-white/10 hover:bg-white/5"
            isExternal
          >
            GitHub
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left w-full max-w-5xl">
        <FeatureCard
          icon={<Cpu className="w-6 h-6 text-blue-400" />}
          title="Super Fast"
          description="Built on Next.js App Router for optimal performance and SEO out of the box."
        />
        <FeatureCard
          icon={<BookOpen className="w-6 h-6 text-purple-400" />}
          title="MDX Remote"
          description="Load your content from anywhere. Files, databases, or even remote APIs."
        />
        <FeatureCard
          icon={<Globe className="w-6 h-6 text-pink-400" />}
          title="Modern UI"
          description="Glassmorphic design system using Tailwind CSS v4 and Framer Motion."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/60 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
