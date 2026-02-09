'use client';

import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
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
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                            <FileText className="w-6 h-6" />
                        </div>
                        <h1 className={`text-4xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Terms of Service
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
                            Agreement to Terms
                        </h2>
                        <p className="leading-relaxed">
                            By accessing and using the Nomadic MDX Blog website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Use License
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Permission is granted to temporarily download one copy of the materials (information or software) on Nomadic MDX Blog for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>Modifying or copying the materials</li>
                            <li>Using the materials for any commercial purpose or for any public display</li>
                            <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                            <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
                        </ul>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Disclaimer
                        </h2>
                        <p className="leading-relaxed">
                            The materials on Nomadic MDX Blog&apos;s website are provided on an &quot;as is&quot; basis. Nomadic MDX Blog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Limitations
                        </h2>
                        <p className="leading-relaxed">
                            In no event shall Nomadic MDX Blog or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nomadic MDX Blog.
                        </p>
                    </section>

                    <section className={`p-6 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <h2 className={`text-2xl font-bold mb-4 font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Contact Us
                        </h2>
                        <p className="leading-relaxed">
                            If you have any questions about these Terms of Service, please contact us at{' '}
                            <a href="mailto:hello@nomadic.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                hello@nomadic.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
