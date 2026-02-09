'use client';

import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';
import { Users, Globe, Zap } from 'lucide-react';

export default function About() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-950 to-black' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}>
                            <Zap className={`w-6 h-6 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                        <h1 className={`text-4xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            About Nomadic
                        </h1>
                    </div>
                    <p className={`text-lg font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Exploring the world, one story at a time
                    </p>
                </div>

                {/* Content */}
                <div className={`space-y-8 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Our Story
                        </h2>
                        <p className="leading-relaxed">
                            Nomadic MDX Blog was founded with a simple mission: to connect travelers, share authentic stories, and inspire a community of digital nomads exploring the world. We believe that travel is more than just visiting new places—it&apos;s about connecting with people, cultures, and perspectives that transform how we see the world.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            What We Do
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <Globe className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                <div>
                                    <h3 className={`font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Share Stories</h3>
                                    <p className="text-sm">Authentic travel narratives and insights from nomadic explorers around the globe.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Users className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                                <div>
                                    <h3 className={`font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Build Community</h3>
                                    <p className="text-sm">Connect with like-minded travelers and exchange experiences in our vibrant community.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Zap className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
                                <div>
                                    <h3 className={`font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Inspire Adventures</h3>
                                    <p className="text-sm">Provide practical tips, guides, and inspiration for your next adventure.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Our Values
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                                <div>
                                    <strong>Authenticity</strong> - We celebrate real stories and genuine experiences
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isDark ? 'bg-purple-400' : 'bg-purple-600'}`}></span>
                                <div>
                                    <strong>Community</strong> - We foster connections and support among travelers
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isDark ? 'bg-pink-400' : 'bg-pink-600'}`}></span>
                                <div>
                                    <strong>Innovation</strong> - We embrace modern technology to enhance storytelling
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Get In Touch
                        </h2>
                        <p className="leading-relaxed mb-4">
                            We&apos;d love to hear from you. Whether you want to share your story, collaborate, or just say hello:
                        </p>
                        <a
                            href="mailto:hello@nomadic.com"
                            className={`inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${isDark
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                            }`}
                        >
                            hello@nomadic.com
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
