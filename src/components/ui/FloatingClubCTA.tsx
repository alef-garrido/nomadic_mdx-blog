'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const FloatingClubCTA = ({ onShowLanding }: { onShowLanding?: () => void }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col sm:flex-row gap-3 items-center`}
        >
            {/* Join Club Button */}
            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => alert('Join Club feature coming soon!')}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-mono text-sm font-semibold transition-all shadow-xl hover:shadow-2xl transform"
                aria-label="Join the club"
            >
                <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Join Club
                </span>
            </motion.button>

            {/* Go Back Button (Learn More) */}
            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onShowLanding}
                className={`px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all shadow-lg hover:shadow-xl transform flex items-center gap-2 ${isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                    }`}
            >
                <BookOpen className="w-4 h-4" />
                Learn More
            </motion.button>
        </motion.div>
    );
};
