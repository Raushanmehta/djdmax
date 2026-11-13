import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const defaultStats = [
    {
        icon: <FaUsers className="h-6 w-6 text-blue-500" />,
        number: "2000+",
        label: "Happy Customers",
    },
    {
        icon: <FaShieldAlt className="h-6 w-6 text-blue-500" />,
        number: "1500+",
        label: "Hair Assessments Completed",
    },
    {
        icon: <FaCheckCircle className="h-6 w-6 text-blue-500" />,
        number: "5000+",
        label: "Successful Treatment Plans",
    },
    {
        icon: <FaCheckCircle className="h-6 w-6 text-blue-500" />,
        number: "5000+",
        label: "Successful Treatment Plans",
    },
];

function Counter({ number }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const counterRef = useRef(null);

    // Extract number and suffix
    const numericValue = parseInt(number.replace(/\D/g, ""), 10);
    const suffix = number.replace(/[0-9]/g, "");

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
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [started, numericValue]);

    return (
        <span ref={counterRef}>
            {count}
            {suffix}
        </span>
    );
}

export default function StatsSection({ stats = defaultStats }) {
    return (
        <section className="relative overflow-hidden border-y border-gray-100 bg-white px-6 py-6 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-[1330px]">
                <div className="grid grid-cols-1 items-center gap-8 text-center md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col items-center justify-center space-y-2 py-4 ${
                                index !== stats.length - 1
                                    ? "md:border-r md:border-gray-200"
                                    : ""
                            }`}
                        >
                            {/* Icon */}
                            <div className="mb-1 flex items-center justify-center">
                                {stat.icon}
                            </div>

                            {/* Animated Number */}
                            <h3 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                <Counter number={stat.number} />
                            </h3>

                            {/* Label */}
                            <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}