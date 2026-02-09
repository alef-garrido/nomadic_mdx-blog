'use client';

import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';
import { Accessibility as AccessibilityIcon } from 'lucide-react';

export default function Accessibility() {
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
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'}`}>
                            <AccessibilityIcon className="w-6 h-6" />
                        </div>
                        <h1 className={`text-4xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Accessibility
                        </h1>
                    </div>
                    <p className={`text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Our commitment to an inclusive web experience
                    </p>
                </div>

                {/* Content */}
                <div className={`space-y-8 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Our Commitment
                        </h2>
                        <p className="leading-relaxed">
                            Nomadic MDX Blog is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Accessibility Features
                        </h2>
                        <ul className="space-y-3 list-disc list-inside">
                            <li>Semantic HTML structure for screen reader compatibility</li>
                            <li>Keyboard navigation support throughout the site</li>
                            <li>High contrast color options and dark mode support</li>
                            <li>Alternative text for all images and visual content</li>
                            <li>Resizable text and responsive design</li>
                            <li>ARIA labels and role attributes where appropriate</li>
                        </ul>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Standards Compliance
                        </h2>
                        <p className="leading-relaxed">
                            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standard. This ensures that our website is accessible to the widest possible audience, including people with visual, auditory, motor, and cognitive disabilities.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Browser and Assistive Technology Support
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Our website is tested with popular screen readers and assistive technologies including:
                        </p>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>NVDA (NonVisual Desktop Access)</li>
                            <li>JAWS (Job Access With Speech)</li>
                            <li>VoiceOver (macOS and iOS)</li>
                            <li>Modern browser zoom and text enlargement features</li>
                        </ul>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Report Accessibility Issues
                        </h2>
                        <p className="leading-relaxed">
                            If you encounter any accessibility barriers on our website, please let us know. We&apos;re committed to making improvements. Contact us at{' '}
                            <a href="mailto:hello@nomadic.com" className="text-green-400 hover:text-green-300 transition-colors">
                                hello@nomadic.com
                            </a>
                            {' '}with details about the issue you encountered.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
