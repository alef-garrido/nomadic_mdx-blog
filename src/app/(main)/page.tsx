"use client";

import Link from "next/link";
import { Snippet, Button, Code, Link as HeroLink } from "@heroui/react";
import { ArrowRight, BookOpen, Cpu, Globe } from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import { MagicBento } from "@/components";
import { HeroParallax } from "@/components/ui/ParallaxDisplay";
import { LeadForm } from "@/components/forms/LeadForm";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex flex-col items-center font-mono">
      <div className="w-full max-w-5xl mx-4 my-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          A Nomadic Network
        </div>

        <div className="w-full max-w-5xl m-4">
          <div className="">
            <h1 className="text-4xl md:text-6xl font-bold font-display">
              Update to the latest version&nbsp;
            </h1>
            <h2 className="text-5xl md:text-8xl text-emerald-400 uppercase font-display">of your freedom</h2>
            <h2 className="text-5xl md:text-6xl font-bold font-display">with nomad_proxy.</h2>
            <h2 className="mt-8 text-3xl font-mono">
              Secured, expedite and modern full-time traveling.
            </h2>
            <div className="mt-8 flex gap-3">
              <Button
                color="primary"
                // href={siteConfig.links.sponsor}
                variant="flat"
                className="font-mono"
              >
                Request Invite now
              </Button>
              <Button
                color="primary"
                // href={siteConfig.links.whatsapp}
                variant="flat"
                className="font-mono"
              >
                Talk to the team
              </Button>
            </div>
          </div>

          <div className="my-8 grid place-items-start md:place-items-end">
            <Snippet hideCopyButton hideSymbol variant="bordered" className="w-full justify-center font-mono">
              <span className="font-mono">
                Next Departure: <Code color="danger" className="font-mono">OCTOBER_28_2026</Code>
              </span>
            </Snippet>
          </div>
        </div>
      </div>
      <div className="w-full mt-8">
        <Marquee />
      </div>
      <HeroParallax />
  <div className="w-full my-24 flex items-center justify-center">
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="0, 255, 100"
        disableAnimations={false}
      />
 </div>
      <div className="w-full max-w-5xl mt-24 mb-16">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-12">
          <h3 className="text-3xl font-bold mb-2 font-serif">Stay Connected</h3>
          <p className="text-foreground/60 mb-8 font-mono">Get updates about our journey and connect with the nomadic community.</p>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 font-serif">{title}</h3>
      <p className="text-foreground/60 text-sm leading-relaxed font-mono">{description}</p>
    </div>
  );
}
