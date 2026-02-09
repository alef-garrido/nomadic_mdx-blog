'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ClubLandingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
            )}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}
                    >
                        {/* Header with close button */}
                        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                            <h2 className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Nomadic Club
                            </h2>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'}`}
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content - 2 column layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(90vh-70px)]">
                            {/* Left Column - Info */}
                            <div className={`p-8 space-y-6 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
                                <div>
                                    <h3 className={`text-3xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        Join the Global Community
                                    </h3>
                                    <p className={`text-lg leading-relaxed font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        Connect with thousands of digital nomads and travelers from around the world. Share stories, get recommendations, and build lasting friendships.
                                    </p>
                                </div>

                                <blockquote className={`border-l-4 pl-6 py-4 italic text-lg ${isDark ? 'border-blue-500/50 text-slate-300' : 'border-blue-400 text-slate-700'}`}>
                                    "A network of travelers, united by the passion for exploration and personal growth."
                                </blockquote>

                                <div className="space-y-4">
                                    <h4 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        What You'll Get
                                    </h4>
                                    <ul className={`space-y-3 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        {[
                                            'Access to exclusive travel guides and tips',
                                            'Connect with 5,000+ active community members',
                                            'Share and read authentic travel stories',
                                            'Get recommendations for 200+ destinations',
                                            'Join community events and meetups',
                                            'Early access to new features and content'
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105">
                                        Join the Club Now
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}`}
                                    >
                                        Back to Club
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Scrollable Content */}
                            <div className={`overflow-y-auto p-8 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
                                <div className={`space-y-8 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {/* Section 1 */}
                                    <section>
                                        <h3 className={`text-2xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            Our Mission
                                        </h3>
                                        <p className="leading-relaxed">
                                            To create a global community where travelers, digital nomads, and explorers can connect, share experiences, and inspire one another to discover the world in meaningful ways.
                                        </p>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h3 className={`text-2xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            Community Features
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>📖 Story Sharing</h4>
                                                <p className="text-sm">Share your travel stories, photos, and experiences with a supportive community of fellow travelers.</p>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>💬 Discussion Forum</h4>
                                                <p className="text-sm">Engage in meaningful conversations about destinations, travel tips, and nomadic lifestyle.</p>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>🗺️ Destination Guides</h4>
                                                <p className="text-sm">Access community-curated guides for 200+ destinations around the world.</p>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>🤝 Meetups & Events</h4>
                                                <p className="text-sm">Connect in person at community gatherings and organized travel events.</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h3 className={`text-2xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            Success Stories
                                        </h3>
                                        <div className="space-y-4">
                                            <blockquote className={`border-l-4 pl-4 py-2 italic text-sm ${isDark ? 'border-blue-500/50' : 'border-blue-400'}`}>
                                                "Through this community, I found my travel partners and discovered 15 new countries. The connections I made will last a lifetime."
                                                <footer className={`mt-2 font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>— Sarah, Digital Nomad</footer>
                                            </blockquote>
                                            <blockquote className={`border-l-4 pl-4 py-2 italic text-sm ${isDark ? 'border-purple-500/50' : 'border-purple-400'}`}>
                                                "The destination guides and tips from community members saved me so much time and money. Highly recommend!"
                                                <footer className={`mt-2 font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>— Alex, Adventure Seeker</footer>
                                            </blockquote>
                                        </div>
                                    </section>

                                    {/* Section 4 */}
                                    <section>
                                        <h3 className={`text-2xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            Ready to Join?
                                        </h3>
                                        <p className="leading-relaxed">
                                            Don't miss out on the opportunity to be part of a vibrant global community. Sign up today and start your journey with us!
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
