'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Users, Zap, Globe, MessageCircle, Heart, Compass } from 'lucide-react';
import Link from 'next/link';

export default function ClubPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-black' : 'bg-gradient-to-b from-slate-50 via-slate-100 to-white'}`}>
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 font-mono">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Join the Community
                            </div>
                            <h1 className={`text-5xl md:text-6xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Welcome to the Nomadic Club
                            </h1>
                            <p className={`text-xl font-mono leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Connect with travelers, share stories, and build meaningful friendships with digital nomads from around the world.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 font-mono">
                                Join Now
                            </button>
                            <button className={`px-8 py-3 border-2 rounded-lg font-medium transition-all duration-300 font-mono ${isDark
                                ? 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                                : 'border-purple-400 text-purple-600 hover:bg-purple-400/10'
                                }`}>
                                Learn More
                            </button>
                        </div>

                        <blockquote className={`border-l-4 pl-6 py-2 italic ${isDark ? 'border-blue-500/50 text-slate-300' : 'border-blue-400 text-slate-700'}`}>
                            "Travel alone to know yourself, travel together to know the world." - The Nomadic Way
                        </blockquote>
                    </div>

                    {/* Right Visual */}
                    <div className={`p-8 rounded-2xl border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="space-y-4">
                            {[
                                { icon: Users, title: '5,000+', desc: 'Active Members' },
                                { icon: Globe, title: '150+', desc: 'Countries' },
                                { icon: Compass, title: '200+', desc: 'Destinations' },
                                { icon: Heart, title: '10K+', desc: 'Shared Stories' }
                            ].map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={idx} className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:bg-slate-100'}`}>
                                        <Icon className={`w-8 h-8 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                        <div>
                                            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.title}</div>
                                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{stat.desc}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Why Join Section */}
                <div className={`p-12 rounded-2xl border mb-24 transition-colors ${isDark ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'}`}>
                    <h2 className={`text-3xl font-bold font-display mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Why Join the Nomadic Club?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: MessageCircle,
                                title: 'Connect & Share',
                                desc: 'Share your travel stories, tips, and experiences with a community of like-minded explorers.'
                            },
                            {
                                icon: Compass,
                                title: 'Discover Destinations',
                                desc: 'Get insider recommendations and travel guides from people who have been there.'
                            },
                            {
                                icon: Heart,
                                title: 'Build Friendships',
                                desc: 'Meet fellow nomads and form lasting connections across the globe.'
                            },
                            {
                                icon: Zap,
                                title: 'Access Exclusive Content',
                                desc: 'Get early access to new stories, guides, and community events.'
                            }
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className={`p-6 rounded-xl border transition-all hover:shadow-lg ${isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-400'}`}>
                                    <Icon className={`w-8 h-8 mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <h3 className={`font-bold mb-2 text-lg font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Featured Members */}
                <div className="mb-24">
                    <h2 className={`text-3xl font-bold font-display mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Meet Our Community
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Alex Chen', location: 'Southeast Asia', title: 'Adventure Seeker' },
                            { name: 'Maria Santos', location: 'South America', title: 'Cultural Explorer' },
                            { name: 'James Wilson', location: 'Europe & Middle East', title: 'Remote Developer' }
                        ].map((member, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-xl border text-center transition-all hover:shadow-lg ${isDark
                                    ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-blue-500/50'
                                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-400'
                                }`}
                            >
                                <div className={`w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500`}></div>
                                <h3 className={`font-bold text-lg mb-1 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {member.name}
                                </h3>
                                <p className={`text-sm font-mono mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                    {member.title}
                                </p>
                                <p className={`text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    📍 {member.location}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={`p-12 rounded-2xl text-center space-y-6 mb-12 transition-colors ${isDark
                    ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50'
                    : 'bg-gradient-to-r from-blue-100/50 to-purple-100/50 border border-blue-300/50'
                    }`}>
                    <h2 className={`text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Ready to Join the Journey?
                    </h2>
                    <p className={`max-w-2xl mx-auto text-lg font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Become part of a global community of travelers, explorers, and dreamers. Share your stories and discover the world together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button className="px-8 py-3 bg-green-400 hover:bg-green-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 font-mono">
                            Join the Club
                        </button>
                        <Link
                            href="/blog"
                            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 font-mono ${isDark
                                ? 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                                }`}
                        >
                            Read Stories
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
