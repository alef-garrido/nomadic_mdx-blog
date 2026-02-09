'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

export default function CookiePolicy() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
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
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                            <Cookie className="w-6 h-6" />
                        </div>
                        <h1 className={`text-4xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Cookie Policy
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
                            What are Cookies?
                        </h2>
                        <p className="leading-relaxed">
                            Cookies are small files that are stored on your browser or device when you visit our website. They help us remember your preferences, understand how you use our site, and improve your experience.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Types of Cookies We Use
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Essential Cookies</h3>
                                <p>Required for the website to function properly, including authentication and security features.</p>
                            </div>
                            <div>
                                <h3 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Performance Cookies</h3>
                                <p>Help us understand how visitors interact with our website and identify areas for improvement.</p>
                            </div>
                            <div>
                                <h3 className={`font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Preference Cookies</h3>
                                <p>Remember your choices and preferences, such as language and theme selections.</p>
                            </div>
                        </div>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Managing Your Cookies
                        </h2>
                        <p className="leading-relaxed">
                            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Third-Party Cookies
                        </h2>
                        <p className="leading-relaxed">
                            We may allow third parties to set cookies on our website for analytics and advertising purposes. These third parties are responsible for managing their own cookies and respecting your privacy choices.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Contact Us
                        </h2>
                        <p className="leading-relaxed">
                            If you have any questions about our use of cookies, please contact us at{' '}
                            <a href="mailto:hello@nomadic.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                                hello@nomadic.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
