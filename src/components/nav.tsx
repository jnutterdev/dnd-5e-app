"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/user-menu";

interface NavLink {
    href: string;
    label: string;
    external?: boolean;
}

const navLinks: NavLink[] = [
    { href: "/", label: "Campaign" },
    { href: "/fellowship", label: "Fellowship" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/compendium", label: "Compendium" },
    { href: "/gamemasters", label: "Gamemasters" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (href: string) =>
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);

    // Close mobile menu on Esc key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-[52px] bg-[#272524]/92 backdrop-blur-md border-b border-[#4a4845]/50 px-6 md:px-10">
            <div className="h-full flex items-center justify-between max-w-[1400px] mx-auto">
                {/* Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-[#b8b098] hover:text-[#ddd4b0] transition-colors font-['Cinzel'] text-xs font-semibold tracking-[0.2em] uppercase"
                    onClick={() => setIsOpen(false)}
                >
                    <svg
                        className="w-7 h-7 text-[#6898a8] shrink-0"
                        viewBox="0 0 60 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <text
                            x="30"
                            y="33"
                            textAnchor="middle"
                            fontFamily="Almendra SC, serif"
                            fontSize="28"
                            fontWeight="400"
                            fill="currentColor"
                        >
                            EK
                        </text>
                    </svg>
                    <span>Emberfall Keep</span>
                </Link>

                <div className="flex items-center gap-3">
                    {/* Desktop Links */}
                    <nav className="hidden lg:flex items-center">
                        <ul className="flex items-center gap-1 list-none m-0 p-0">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`font-['Cinzel'] text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 transition-colors whitespace-nowrap block ${
                                                active
                                                    ? "text-[#ddd4b0] font-semibold"
                                                    : "text-[#9a8c7e] hover:text-[#ddd4b0]"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li>
                                <a
                                    href="https://discord.gg/dTRaBUNY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-['Cinzel'] text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 transition-colors whitespace-nowrap text-[#7289da] hover:text-[#99aaf0] flex items-center gap-1.5"
                                >
                                    <i className="fa-brands fa-discord"></i> Discord
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <UserMenu />

                    {/* Mobile Toggle Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="lg:hidden text-[#b8b098] hover:text-[#ddd4b0] p-2 focus:outline-none"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                    >
                        <i
                            className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-lg`}
                        ></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="lg:hidden fixed top-[52px] left-0 right-0 bg-[#272524]/98 backdrop-blur-md border-b border-[#4a4845]/50 shadow-2xl py-4 px-6 flex flex-col">
                    <ul className="flex flex-col list-none m-0 p-0 divide-y divide-[#4a4845]/30">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`font-['Cinzel'] text-xs tracking-[0.15em] uppercase py-3 transition-colors block ${
                                            active
                                                ? "text-[#ddd4b0] font-semibold"
                                                : "text-[#9a8c7e] hover:text-[#ddd4b0]"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <a
                                href="https://discord.gg/dTRaBUNY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-['Cinzel'] text-xs tracking-[0.15em] uppercase py-3 transition-colors text-[#7289da] hover:text-[#99aaf0] flex items-center gap-2"
                            >
                                <i className="fa-brands fa-discord"></i> Discord
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
