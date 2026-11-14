import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto py-10 px-6 sm:px-10 flex flex-col items-center gap-5 text-center border-t border-[#4a4845]/40 bg-[#272524]/50">
            <span className="font-['Cinzel_Decorative',serif] text-xs font-bold tracking-[0.18em] uppercase text-[#b8b098]">
                Emberfall Keep
            </span>
            <ul className="flex flex-wrap justify-center gap-1 list-none p-0 m-0">
                <li>
                    <Link
                        href="/"
                        className="font-['Cinzel'] text-[9px] tracking-[0.15em] uppercase text-[#9a8c7e] hover:text-[#ddd4b0] px-3 py-1 transition-colors"
                    >
                        Campaign
                    </Link>
                </li>
                <li>
                    <Link
                        href="/fellowship"
                        className="font-['Cinzel'] text-[9px] tracking-[0.15em] uppercase text-[#9a8c7e] hover:text-[#ddd4b0] px-3 py-1 transition-colors"
                    >
                        Fellowship
                    </Link>
                </li>
                <li>
                    <Link
                        href="/campaigns"
                        className="font-['Cinzel'] text-[9px] tracking-[0.15em] uppercase text-[#9a8c7e] hover:text-[#ddd4b0] px-3 py-1 transition-colors"
                    >
                        Campaigns
                    </Link>
                </li>
                <li>
                    <Link
                        href="/compendium"
                        className="font-['Cinzel'] text-[9px] tracking-[0.15em] uppercase text-[#9a8c7e] hover:text-[#ddd4b0] px-3 py-1 transition-colors"
                    >
                        Compendium
                    </Link>
                </li>
                <li>
                    <Link
                        href="/gamemasters"
                        className="font-['Cinzel'] text-[9px] tracking-[0.15em] uppercase text-[#9a8c7e] hover:text-[#ddd4b0] px-3 py-1 transition-colors"
                    >
                        Gamemasters
                    </Link>
                </li>
                <li>
                    <a
                        href="https://discord.gg/dTRaBUNY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Cinzel'] text-[9px] tracking-[0.15em] uppercase text-[#7289da] hover:text-[#99aaf0] px-3 py-1 transition-colors inline-flex items-center gap-1.5"
                    >
                        <i className="fa-brands fa-discord"></i> Discord
                    </a>
                </li>
            </ul>
            <p className="font-['Cinzel'] text-[9px] tracking-[0.2em] uppercase text-[#807868] m-0">
                In Omnia Paratus &middot; Est. 2026
            </p>
        </footer>
    );
}
