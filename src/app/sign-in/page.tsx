import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignInButton from "@/components/sign-in-button";

export const metadata: Metadata = {
    title: "Sign In — Emberfall Keep",
};

const ERROR_MESSAGES: Record<string, string> = {
    email_not_found:
        "Your Discord account needs an email address. Add one in Discord's settings, then try again.",
    access_denied: "Discord sign-in was cancelled.",
};

const GENERIC_ERROR = "Something went wrong signing in with Discord. Please try again.";

// Only allow same-site relative paths, so ?next= can't redirect off-site
function getSafeNextPath(next: string | string[] | undefined): string {
    if (typeof next !== "string") return "/";
    if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
        return "/";
    }
    return next;
}

interface SignInPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const params = await searchParams;
    const nextPath = getSafeNextPath(params.next);

    const session = await auth.api.getSession({ headers: await headers() });
    if (session) redirect(nextPath);

    const errorCode = typeof params.error === "string" ? params.error : null;
    const errorMessage = errorCode
        ? (ERROR_MESSAGES[errorCode] ?? GENERIC_ERROR)
        : null;

    return (
        <main className="relative flex-1 flex items-center justify-center px-6 py-16 overflow-hidden">
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none text-teal-mid opacity-15"
                aria-hidden="true"
            >
                <svg
                    className="w-[520px] h-[520px] md:w-[680px] md:h-[680px]"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.6" />
                    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.6" />
                    <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
                <span className="font-identity text-6xl md:text-7xl text-teal-mid leading-none mb-6">
                    EK
                </span>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-mist-bright tracking-wide mb-3">
                    Emberfall Keep
                </h1>

                <p className="font-body italic text-mist-mid text-base md:text-lg leading-relaxed mb-10">
                    Where campaigns are forged and legends remembered.
                </p>

                <div className="w-full border-t border-void-border/60 mb-10" aria-hidden="true" />

                {errorMessage && (
                    <p
                        role="alert"
                        className="w-full mb-6 px-4 py-3 rounded-sm border border-mauve-bright/40 bg-mauve-mid/15 text-mauve-bright text-sm leading-relaxed"
                    >
                        {errorMessage}
                    </p>
                )}

                <SignInButton callbackURL={nextPath} />

                <p className="mt-6 font-heading text-[10px] tracking-[0.15em] uppercase text-mist-deep">
                    Discord is used only to sign you in
                </p>
            </div>
        </main>
    );
}
