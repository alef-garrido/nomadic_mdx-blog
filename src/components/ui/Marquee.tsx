"use client";
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";

interface ParallaxProps {
    children: string[];
    baseVelocity: number;
}

function wrap(min: number, max: number, value: number) {
    const range = max - min;
    const wrappedValue = ((((value - min) % range) + range) % range) + min;

    return wrappedValue;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 10000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax font-serif">
            <motion.div className="scroller" style={{ x }}>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    );
}

export default function Marquee() {
    return (
        <section className="font-serif">
            <ParallaxText baseVelocity={-3}>
                {`: Nomad_Proxy : Explore yonder : Move now : Stay human: Uniqueness is
        found inside : Nomad_Proxy : Explore yonder : Move now : Stay human:
        Uniqueness is found inside : Nomad_Proxy : Explore yonder : Move now :
        Stay human: Uniqueness is found inside : Stay human: Uniqueness is found
        inside : Nomad_Proxy :`} {" "}
            </ParallaxText>
            <ParallaxText baseVelocity={3}>
                {` Set your self Free / Outgrow your cage / Be yourself / Start Now /
        Become your true self / Set your self Free / Outgrow your cage / Be
        yourself / Start Now / Become your true self / Set your self Free /
        Outgrow your cage / Be yourself / Start Now / Become your true self /
        Set your self Free /`} {" "}
            </ParallaxText>
        </section>
    );
}
