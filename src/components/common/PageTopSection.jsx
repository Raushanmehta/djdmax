import React from "react";

export default function PageTopSection({ title = "About Us" }) {
    return (
        <main>
            <div className="relative z-0 text-center py-16 sm:py-20 shadow-lg bg-orange-500 overflow-hidden text-white">
                
                {/* Background Image - object-bottom se image ka lower/down part focus hoga */}
                <div className="absolute inset-0 -z-10">
                    <img 
                        src="/images/page-banner.jpg"
                        alt={title}
                        fill
                        className="object-cover object-bottom opacity-50"
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-10 px-4 space-y-3">
                    {/* Dynamic Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        {title}
                    </h1>

                    {/* Breadcrumb (Home > Title) */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium opacity-90">
                        <a href="/" className="hover:underline">Home</a>
                        <span>&gt;</span>
                        <span className="capitalize">{title}</span>
                    </div>
                </div>

            </div>
        </main>
    );
}