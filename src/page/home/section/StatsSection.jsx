import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { IoStar } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

const defaultStats = [
    {
        icon: <FaUsers className="h-6 md:h-10 w-6 md:w-10 text-orange-500" />,
        number: "5000+",
        label: "Happy Clients",
    }, {
        icon: <GrDeliver  className="h-6 md:h-10 w-6 md:w-10 text-orange-500" />,
        number: "1500+",
        label: "Events Executed",
    },
    {
        icon: <MdVerified className="h-6 md:h-10 w-6 md:w-10 text-orange-500" />,
        number: "12+",
        label: "Years Experienc",
    },
    {
        icon: <IoStar className="h-6 md:h-10 w-6 md:w-10 text-orange-500" />,
        number: "4.8",
        label: "Google Ratings",
    },
    
];

function Counter({ number }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const counterRef = useRef(null);

    // Extract number and suffix
    const numericMatch = number.match(/^\d+(?:\.\d+)?/);
    const numericText = numericMatch?.[0] ?? "0";
    const numericValue = Number(numericText);
    const decimalPlaces = numericText.split(".")[1]?.length ?? 0;
    const suffix = number.slice(numericText.length);

    // Start counter when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            {
                threshold: 0.3,
            }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [started]);

    // Count from 0 to target
    useEffect(() => {
        if (!started) return;

        let start = 0;
        const duration = 2000;
        const stepTime = 30;
        const increment = numericValue / (duration / stepTime);

        const timer = setInterval(() => {
            start += increment;

            if (start >= numericValue) {
                setCount(numericValue);
                clearInterval(timer);
            } else {
                setCount(
                    decimalPlaces > 0
                        ? Number(start.toFixed(decimalPlaces))
                        : Math.floor(start)
                );
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [started, numericValue, decimalPlaces]);

    return (
        <span ref={counterRef}>
            {count.toFixed(decimalPlaces)}
            {suffix}
        </span>
    );
}

export default function StatsSection({ stats = defaultStats }) {
    return (
        <section className="relative overflow-hidden border-y border-gray-100 bg-gray-50 px-4 transition-colors dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-[1330px]">
                <div className="grid grid-cols-4 items-center gap-3 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col items-center justify-center gap-2 py-4 text-center md:flex-row md:gap-3 md:text-left ${
                                index !== stats.length - 1
                                    ? "md:border-r md:border-gray-200 dark:border-gray-800"
                                    : ""
                            }`}
                        >
                            {/* Icon */}
                            <div className="flex shrink-0 items-center justify-center">
                                {stat.icon}
                            </div>

                            <div className="min-w-0 text-center md:text-left">
                                {/* Animated Number */}
                                <h3 className="font-sans text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-3xl lg:text-4xl">
                                    <Counter number={stat.number} />
                                </h3>

                                {/* Label */}
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}