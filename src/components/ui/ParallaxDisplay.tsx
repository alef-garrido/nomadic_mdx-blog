"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
    { title: "The Beginning", link: "#", thumbnail: "/assets/img/Cover_Chapter1.png" },
    { title: "The Journey", link: "#", thumbnail: "/assets/img/Cover_Chapter2.png" },
    { title: "The Destination", link: "#", thumbnail: "/assets/img/Cover_Chapter3.png" },
    { title: "The Nomad", link: "#", thumbnail: "/assets/img/Cover_Chapter4.png" },
    { title: "The Freedom", link: "#", thumbnail: "/assets/img/Cover_Chapter5.png" },
    { title: "The Legacy", link: "#", thumbnail: "/assets/img/Cover_Chapter6.png" },
    { title: "The Adventure", link: "#", thumbnail: "/assets/img/Cover_Chapter7.png" },
    { title: "The Discovery", link: "#", thumbnail: "/assets/img/Cover_Chapter8.png" },
    { title: "The Awakening", link: "#", thumbnail: "/assets/img/Cover_Chapter9.png" },
    { title: "The Horizon", link: "#", thumbnail: "/assets/img/Cover_Chapter10.png" },
];

export const HeroParallax = () => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(0, 5); // Repeating first row or we could duplicate some
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig,
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig,
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig,
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig,
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig,
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 100]),
        springConfig,
    );

    return (
        <div
            ref={ref}
            className="flex w-full h-[80vh] md:h-[150vh] md:py-20 overflow-hidden antialiased relative flex-col self-auto perspective-500px transform-3d"
        >
            <Header />
            <motion.div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 md:px-0"
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            key={product.title}
                            product={product}
                            translate={translateX}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row md:mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            key={product.title}
                            product={product}
                            translate={translateXReverse}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            key={product.title}
                            product={product}
                            translate={translateX}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="z-10 md:flex flex-col items-center max-w-7xl relative mx-auto py-10 px-4 w-full">
            <h1 className="my-8 text-4xl md:text-7xl lg:text-7xl font-bold dark:text-white">
                Set yourself free
            </h1>
            <p className="md:max-w-2xl text-base md:text-lg lg:text-xl my-12 dark:text-neutral-200 text-center">
                Bespoke slow-traveling journey, Beautiful locations, adventure tourism
                and flexible work-spaces, obtain a more affordable and reliable solution
                to create transformative nomadic journeys.
            </p>
            <Image
                alt="Hero Image"
                className="my-8 rounded-2xl shadow-2xl"
                height="300"
                src="/assets/img/Cover_Chapter9.png"
                width="600"
            />
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <div className="md:mx-auto md:px-4">
            <motion.div
                key={product.title}
                className="group/product h-24 md:h-82 w-full md:w-120 relative"
                style={{ x: translate }}
                whileHover={{ y: -20 }}
            >
                <Link
                    className="block group-hover/product:shadow-2xl"
                    href={product.link}
                >
                    <Image
                        alt={product.title}
                        className="object-cover object-top-left absolute h-full w-full inset-0 rounded-xl"
                        height="300"
                        src={product.thumbnail}
                        width="600"
                    />
                </Link>

                <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-40 bg-black pointer-events-none rounded-xl transition-opacity" />
                <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-bold transition-opacity">
                    {product.title}
                </h2>
            </motion.div>
        </div>
    );
};
