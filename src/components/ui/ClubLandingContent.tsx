'use client';

import React, { useState, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import ClubLandingContentMDX from '@/content/club-landing.mdx';

export const ClubLanding = ({ onGoBack }: { onGoBack: () => void }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <div className={`w-full transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-black' : 'bg-gradient-to-b from-slate-50 via-slate-100 to-white'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

                <div className={`prose dark:prose-invert max-w-none ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <ClubLandingContentMDX />
                </div>
            </div>
        </div>
    );
};
