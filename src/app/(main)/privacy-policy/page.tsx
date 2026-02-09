'use client';

import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                            <Shield className="w-6 h-6" />
                        </div>
                        <h1 className={`text-4xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Privacy Policy
                        </h1>
                    </div>
                    <p className={`text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Content */}
                <div className={`space-y-8 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Introduction
                        </h2>
                        <p className="leading-relaxed">
                            Nomadic MDX Blog (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Information We Collect
                        </h2>
                        <ul className="space-y-3 list-disc list-inside">
                            <li>Personal identification information (name, email address)</li>
                            <li>Device information (IP address, browser type, operating system)</li>
                            <li>Usage data (pages visited, time spent, links clicked)</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            How We Use Your Information
                        </h2>
                        <p className="leading-relaxed">
                            We use the information we collect to improve our website, personalize your experience, send promotional communications, and analyze usage patterns. Your privacy is our priority, and we do not sell your personal information to third parties.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Security
                        </h2>
                        <p className="leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Contact Us
                        </h2>
                        <p className="leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:hello@nomadic.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                                hello@nomadic.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
