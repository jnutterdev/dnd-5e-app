"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function UserMenu() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (e: PointerEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    async function handleSignOut() {
        setIsSigningOut(true);
        await signOut();
        router.push("/sign-in");
        router.refresh();
    }

    if (isPending) {
        return (
            <div
                className="w-8 h-8 rounded-full bg-void-raised animate-pulse"
                aria-hidden="true"
            />
        );
    }

    if (!session) {
        return (
            <Link
                href="/sign-in"
                className="font-heading text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 text-teal-bright hover:text-mist-bright transition-colors whitespace-nowrap"
            >
                Sign in
            </Link>
        );
    }

    const { user } = session;
    const isAdmin = user.role === "ADMIN";

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center rounded-full ring-1 ring-void-border hover:ring-teal-mid focus-visible:ring-2 focus-visible:ring-teal-mid outline-none transition-shadow"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Account menu"
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <span className="w-8 h-8 rounded-full bg-void-raised text-mist-bright font-identity text-sm flex items-center justify-center">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-sm border border-void-border bg-void-surface shadow-2xl py-2"
                >
                    <div className="px-4 py-2 border-b border-void-border/60 mb-1">
                        <p className="font-heading text-xs font-semibold text-mist-bright truncate">
                            {user.name}
                        </p>
                        {isAdmin && (
                            <span className="inline-block mt-1.5 font-heading text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-xs border border-gold/40 text-gold bg-gold/10">
                                Admin
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-left font-heading text-[10px] tracking-[0.15em] uppercase text-mist-mid hover:text-mist-bright hover:bg-void-raised transition-colors disabled:opacity-60"
                    >
                        <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                        {isSigningOut ? "Signing out…" : "Sign out"}
                    </button>
                </div>
            )}
        </div>
    );
}
