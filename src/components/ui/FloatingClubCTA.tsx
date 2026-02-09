'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Users, Mail, MessageCircle } from 'lucide-react';

export const FloatingClubCTA = () => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, 'change', (current) => {
        if (typeof current === 'number') {
            let direction = current - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    const navItems = [
        { name: 'Members', icon: Users },
        { name: 'Discussion', icon: MessageCircle },
        { name: 'Contact', icon: Mail }
    ];

    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 md:gap-4 p-3 md:p-4 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-xl backdrop-blur-md"
                >
                    {navItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={idx}
                                className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{item.name}</span>
                            </button>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
