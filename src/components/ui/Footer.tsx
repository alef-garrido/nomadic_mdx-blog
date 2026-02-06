'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Zap } from 'lucide-react';
import { FaThreads } from 'react-icons/fa6';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import GlitchText from './GlitchText';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <footer className={`w-full transition-colors duration-300 ${isDark
                ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t border-slate-800/50'
                : 'bg-gradient-to-b from-slate-50 via-slate-100 to-white border-t border-slate-200'
            }`}>

                {/* CTA Section */}
                <div className={`py-12 px-8 rounded-2xl mb-12 text-center space-y-4 transition-colors ${isDark
                        ? 'bg-gradient-to-r from-slate-800/50 via-slate-900/50 to-slate-800/50 border border-slate-700/50'
                        : 'bg-gradient-to-r from-slate-100/50 via-slate-200/50 to-slate-100/50 border border-slate-300'
                    }`}>
                    <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Ready to Start Your Journey?
                    </h3>
                    <p className={`max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Join our community of nomadic explorers and share your stories with the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/blog"
                            className="px-8 py-3 bg-green-400 hover:bg-pink-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                        >
                            Learn More
                        </Link>
                        <Link
                            href="/club"
                            className="px-8 py-3 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-lg font-medium transition-all duration-300"
                        >
                            Join Community
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-24 bg-gradient-to-r from-transparent via-transparent to-transparent ${isDark
                        ? 'via-slate-700'
                        : 'via-slate-300'
                    }`}></div>


            {/* Glitch Text Section */}
            <div className={`w-full py-16 border-y transition-colors ${isDark
                    ? 'bg-gradient-to-b from-black via-slate-950 to-black border-slate-800/50'
                    : 'bg-gradient-to-b from-slate-50 via-slate-100 to-white border-slate-200'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GlitchText
                        speed={1}
                        enableShadows
                        enableOnHover={false}
                        className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg"
                    >
                        Explore Yonder
                    </GlitchText>
                    <p className={`text-lg mt-6 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                        Discover the world, one story at a time. Connect with travelers, share experiences, and find inspiration.
                    </p>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Nomadic
                            </h3>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            A modern blog platform for nomadic travelers sharing insights and stories from around the world.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a
                                href="https://threads.net"
                                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                                title="Threads"
                            >
                                <FaThreads className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                                title="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                                title="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Navigation</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className={`text-sm transition-colors flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className={`text-sm transition-colors flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/club" className={`text-sm transition-colors flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Community
                                </Link>
                            </li>
                            <li>
                                <a href="#" className={`text-sm transition-colors flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Featured Image */}
                    <div className="space-y-4">
                        <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Featured</h4>
                        <div className={`stamp-border relative w-full aspect-square rounded-xl overflow-hidden shadow-lg transition-colors ${isDark
                                ? 'hover:border-blue-500/50'
                                : 'hover:border-blue-400'
                            }`}
                            style={{ color: isDark ? 'rgb(51, 65, 85)' : 'rgb(203, 213, 225)' }}>
                            <Image
                                src="/images/featured-story.jpg"
                                alt="feature image"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <div>
                                    <p className="text-white font-semibold text-sm">Latest Story</p>
                                    <p className="text-slate-300 text-xs">Explore the world</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Get in Touch</h4>
                        <div className="space-y-3">
                            <a
                                href="mailto:hello@nomadic.com"
                                className={`flex items-center gap-3 text-sm transition-colors group ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                            >
                                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                hello@nomadic.com
                            </a>
                            <a
                                href="#"
                                className={`flex items-center gap-3 text-sm transition-colors group ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                            >
                                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Worldwide
                            </a>
                        </div>
                        <div className="pt-4">
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className={`w-full transition-colors ${isDark ? 'bg-black border-t border-slate-800/50' : 'bg-white border-t border-slate-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        {/* Copyright */}
                        <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                            &copy; {currentYear} Nomadic MDX Blog. All rights reserved.
                        </p>

                        {/* Legal Links */}
                        <div className="flex flex-wrap gap-6">
                            <a href="#" className={`text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}>
                                Privacy Policy
                            </a>
                            <a href="#" className={`text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}>
                                Terms of Service
                            </a>
                            <a href="#" className={`text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}>
                                Cookie Policy
                            </a>
                            <a href="#" className={`text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}>
                                Accessibility
                            </a>
                        </div>

                        {/* Scroll to Top */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`text-sm transition-colors flex items-center gap-2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Back to top
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
