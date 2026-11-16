"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";

interface SignInButtonProps {
    callbackURL: string;
}

export default function SignInButton({ callbackURL }: SignInButtonProps) {
    const [isRedirecting, setIsRedirecting] = useState(false);

    async function handleSignIn() {
        setIsRedirecting(true);
        const { error } = await signIn.social({
            provider: "discord",
            callbackURL,
            errorCallbackURL: "/sign-in",
        });
        if (error) setIsRedirecting(false);
    }

    return (
        <button
            type="button"
            onClick={handleSignIn}
            disabled={isRedirecting}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm font-heading text-xs font-semibold tracking-[0.18em] uppercase bg-discord hover:bg-discord-hover text-white border border-white/10 shadow-lg transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
            <i className="fa-brands fa-discord text-lg" aria-hidden="true"></i>
            {isRedirecting ? "Opening Discord…" : "Sign in with Discord"}
        </button>
    );
}
