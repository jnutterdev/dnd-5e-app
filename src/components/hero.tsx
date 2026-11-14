import Link from "next/link";

export interface HeroProps {
    title?: string;
    tagline?: string;
    badge?: string;
}

export default function Hero({
    title = "Sigil: City of Doors",
    tagline = "Where campaigns are forged and legends remembered.",
    badge = "Active Campaign",
}: HeroProps) {
    return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-[#4a4845]/50 bg-gradient-to-b from-[#141e22]/40 via-transparent to-transparent">
            {/* Background Seal / Monogram */}
            <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 pointer-events-none opacity-20 md:opacity-35 text-[#6898a8]">
                <svg
                    className="w-[320px] h-[320px] md:w-[460px] md:h-[460px]"
                    viewBox="0 0 280 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="140"
                        cy="100"
                        r="96"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        opacity="0.4"
                        fill="none"
                    />
                    <circle
                        cx="140"
                        cy="100"
                        r="90"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        opacity="0.4"
                        fill="none"
                    />
                    <text
                        x="140"
                        y="145"
                        textAnchor="middle"
                        fontFamily="Almendra SC, serif"
                        fontSize="120"
                        fontWeight="400"
                        fill="currentColor"
                        opacity="0.85"
                    >
                        EK
                    </text>
                </svg>
            </div>

            <div className="max-w-[1100px] mx-auto px-6 sm:px-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        {badge && (
                            <div className="inline-block font-['Cinzel'] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-xs border border-[#6898a8]/40 text-[#a0c0c8] bg-[#6898a8]/10 mb-4 font-semibold">
                                {badge}
                            </div>
                        )}
                        <h1 className="font-['Cinzel_Decorative',serif] text-4xl sm:text-6xl md:text-7xl font-bold text-[#ddd4b0] tracking-wide leading-[1.05] mb-4">
                            {title}
                        </h1>
                        <p className="font-serif italic text-base sm:text-lg text-[#b8b098] leading-relaxed max-w-xl">
                            {tagline}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/campaigns"
                            className="inline-flex items-center gap-2 px-4 py-2 font-['Cinzel'] text-[10px] font-semibold tracking-[0.14em] uppercase bg-[#3a6070] hover:bg-[#6898a8] text-[#ddd4b0] hover:text-[#272524] border border-[#6898a8]/40 transition-colors rounded-xs shadow-md"
                        >
                            <i className="fa-solid fa-scroll text-xs"></i>{" "}
                            Chronicles
                        </Link>
                        <Link
                            href="/fellowship"
                            className="inline-flex items-center gap-2 px-4 py-2 font-['Cinzel'] text-[10px] font-semibold tracking-[0.14em] uppercase bg-transparent hover:border-[#ddd4b0]/40 text-[#b09888] hover:text-[#ddd4b0] border border-[#4a4845] transition-colors rounded-xs"
                        >
                            <i className="fa-solid fa-users text-xs"></i>{" "}
                            Fellowship
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
