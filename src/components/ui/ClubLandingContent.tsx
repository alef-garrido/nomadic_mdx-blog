'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const ClubLanding = ({ onGoBack }: { onGoBack: () => void }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <div className={`w-full transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-black' : 'bg-gradient-to-b from-slate-50 via-slate-100 to-white'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Go Back Button */}
                <button
                    onClick={onGoBack}
                    className={`flex items-center gap-2 mb-12 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all ${isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Club
                </button>

                {/* Content */}
                <div className={`prose dark:prose-invert max-w-none ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {/* Title Section */}
                    <div className="mb-12">
                        <h1 className={`text-5xl md:text-6xl font-bold font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Unleash Your Nomadic Spirit
                        </h1>
                        <p className={`text-xl font-mono leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Embark on a journey of discovery and creativity with immersive cultural experiences, pop-up adventures, and a gamified travel app that celebrates the art of slow travel.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-bold font-display mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Overwhelmed by the Complexity of Modern Travel?
                        </h2>
                        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            Effortless and Safe Global Exploration
                        </h3>
                        <blockquote className={`border-l-4 pl-6 py-4 my-6 italic text-lg ${isDark ? 'border-blue-500/50 text-slate-300' : 'border-blue-400 text-slate-700'}`}>
                            Freedom still matters.
                        </blockquote>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Modern travel demands more than just booking tickets and accommodations; it requires a <strong>meticulous approach to safety, comfort, and cultural engagement.</strong> Imagine a <strong>travel partner</strong> who takes care of every detail, from secure locations to luxurious amenities and cultural immersion.
                            </p>
                            <p>
                                <strong>The Nomadic Club</strong> is your gateway to a world where travel is as enriching as it is <strong>effortless and secure</strong>.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-bold font-display mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Join the Brave
                        </h2>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Step beyond traditional travel into a realm where your journeys are secured and every destination feels like home. With our high-end amenities and robust community support, the Nomadic Club transforms your travels into unforgettable experiences.
                            </p>
                        </div>

                        <h3 className={`text-2xl font-bold mt-10 mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Navigating the complexities of modern travel can be daunting.
                        </h3>
                        <div className={`space-y-3 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p className="font-bold">Does Any of This Sound Familiar?</p>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>Overwhelmed by the logistics and risks of exploring new locations on your own?</li>
                                <li>Unsure how to balance the thrill of adventure with the comfort and security you need?</li>
                                <li>Concerned about the environmental impact and cultural insensitivity of typical tourist paths?</li>
                                <li>Adventurous travel can be uncomfortable and risky.</li>
                                <li>Eco-conscious and culturally respectful journeys are difficult to find.</li>
                                <li>Planning and adjustments can be difficult. Period.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="mb-16">
                        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            You are not alone.
                        </h3>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Many modern travelers share these concerns, feeling that conventional travel packages simply do not meet their needs.
                            </p>
                            <p>
                                At the <strong>Nomadic Club</strong>, we understand your challenges and offer a new way forward. Our innovative community is designed not just to meet but to exceed the diverse needs of modern nomads like you.
                            </p>
                            <p>
                                Our strategic and community-driven approach offers a solution that puts your mind at ease, wherever you roam.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-bold font-display mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Rethinking Travel: Freedom from Conventional Constraints
                        </h2>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Transform your travel experiences with the Nomadic Club, where security, comfort, sustainability, and personalization are standard.
                            </p>
                            <p>
                                Meet your traveling needs with customized travel plans that guarantee security and quality, even on the road.
                            </p>
                            <p>
                                We combine adventure with safety and comfort, ensuring a seamless experience. These journeys are now our standard, easily accessible and integrated into every travel plan. Receive real-time community support, ensuring you are always informed and can adapt seamlessly.
                            </p>
                            <p>
                                Each journey is tailored to your preferences, making every trip unique and meaningful.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="mb-16">
                        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Envision a Journey Tailored Just for You
                        </h3>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Your ideal travel experience awaits. With the Nomadic Club, experience the thrill of discovery without the stress. Our connected community and shared knowledge ensure that your travel dreams are not only met but exceeded.
                            </p>

                            <div className={`mt-8 space-y-4 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'} p-6 rounded-lg`}>
                                <div>
                                    <p className="font-bold mb-2">🎯 Tailored Experience Design:</p>
                                    <p>Experience travel planned around your preferences and needs, leveraging our community wisdom that adapts to different styles and destinations.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">🌍 Global Community Network:</p>
                                    <p>Join 5,000+ members spanning 150+ countries who share insights, recommendations, and support for 200+ destinations worldwide.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">💪 Health and Wellness Support:</p>
                                    <p>Maintain your health routines while traveling with personalized advice from community members, wellness tips, and dietary accommodations.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">🚀 Strategic Mobility Solutions:</p>
                                    <p>Navigate your travels efficiently using our community-shared transport tips and logistical knowledge to streamline your movements.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">🛡️ Shared Safety Knowledge:</p>
                                    <p>Travel with peace of mind knowing that community members have tested and verified safety protocols and best practices for your destinations.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-bold font-display mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Introducing a Crafted Approach to Full-time Traveling
                        </h2>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Discover a new paradigm of nomadic living with the Nomadic Club. Beyond mere travel, we offer a community transformation that combines the freedom of nomadic life with the support and security of a global family.
                            </p>
                            <p>
                                Our innovative approach enhances every aspect of your trip, by making it not just a journey, but a continuous experience of growth, learning, and fulfillment.
                            </p>
                        </div>

                        <h3 className={`text-2xl font-bold mt-10 mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            How the Nomadic Club Bridges the Gap
                        </h3>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                The Nomadic Club isn't just another travel platform. We use collective wisdom and personalized connections to ensure every aspect of your travel is covered. From community-recommended itineraries tailored to your interests and needs, to real-time support ensuring your safety and comfort on the go.
                            </p>
                            <p>
                                With the Nomadic Club, you step into a world where travel is seamless, secure, and perfectly aligned with <strong>your lifestyle and aspirations</strong>.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-bold font-display mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Understanding Our Community Process
                        </h2>
                        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            How Does the Nomadic Club Enhance Your Travel Experience?
                        </h3>
                        <div className={`grid md:grid-cols-3 gap-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <div className={`p-6 rounded-lg border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                                <h4 className={`font-bold mb-3 text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Step 1</h4>
                                <p className="font-bold mb-2">Identify Your Preferences</p>
                                <p className="text-sm">Tell us about your travel preferences and what you seek in your journeys. Our platform tailors recommendations specifically for you.</p>
                            </div>
                            <div className={`p-6 rounded-lg border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                                <h4 className={`font-bold mb-3 text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Step 2</h4>
                                <p className="font-bold mb-2">Receive Personalized Plans</p>
                                <p className="text-sm">Based on your preferences, receive recommendations from experienced travelers with destination insights and curated activities.</p>
                            </div>
                            <div className={`p-6 rounded-lg border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                                <h4 className={`font-bold mb-3 text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Step 3</h4>
                                <p className="font-bold mb-2">Track & Adjust in Real-Time</p>
                                <p className="text-sm">Keep track of your itinerary and make adjustments with community support. Stay flexible with real-time advice from fellow travelers.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="mb-16">
                        <h2 className={`text-4xl font-bold font-display mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Why We Created the Nomadic Club
                        </h2>
                        <div className={`space-y-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <p>
                                Because we believe traveling is the best way to expand our understanding of the world and ourselves. It opens our minds to new cultures, perspectives, and experiences that we wouldn't encounter otherwise.
                            </p>
                            <blockquote className={`border-l-4 pl-6 py-4 italic text-lg ${isDark ? 'border-blue-500/50 text-slate-300' : 'border-blue-400 text-slate-700'}`}>
                                We've been where you are—<strong>yearning for adventure but restrained</strong> by the complexities of planning safe, rewarding journeys. The Nomadic Club was born from a vision to eliminate these barriers, allowing you to explore confidently and comfortably. We're here to ensure that <strong>your travels are not just trips, but transformative experiences</strong>.
                            </blockquote>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className={`p-12 rounded-2xl text-center space-y-6 ${isDark
                        ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50'
                        : 'bg-gradient-to-r from-blue-100/50 to-purple-100/50 border border-blue-300/50'
                        }`}>
                        <h2 className={`text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Ready to Transform Your Travel Experience?
                        </h2>
                        <p className={`max-w-2xl mx-auto text-lg font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Embark on a journey unlike any other with the Nomadic Club. Start your adventure today and experience travel that goes beyond the ordinary, tailored just for you. Join our community of modern explorers seeking not just sights, but transformative experiences.
                        </p>
                        <button
                            onClick={onGoBack}
                            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-mono text-sm font-semibold transition-all transform hover:scale-105"
                        >
                            Join the Club Now
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
