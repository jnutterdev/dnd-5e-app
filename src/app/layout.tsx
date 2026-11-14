import type { Metadata } from "next";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Emberfall Keep — D&D 5e Campaign Platform",
    description:
        "A living tome for Dungeons & Dragons campaigns, character sheets, chronicles, and world lore. Designed and built by ashtephra.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="h-full antialiased"
            data-scroll-behavior="smooth"
        >
            <head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=cinzel:400,600,700|cinzel-decorative:700|almendra-sc:400|im-fell-english:400,400i|texturina:400,400i&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                />
            </head>
            <body className="min-h-full flex flex-col relative">
                {/* Fixed atmospheric background on isolated compositor layer */}
                <div
                    className="fixed inset-0 -z-50 pointer-events-none transform-gpu"
                    style={{
                        backgroundImage: `
              radial-gradient(ellipse 70% 50% at 0% 0%, rgba(180, 100, 80, 0.07) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 100% 100%, rgba(104, 152, 168, 0.07) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(20, 18, 18, 0.4) 100%)
            `,
                        backgroundColor: "#272524",
                    }}
                    aria-hidden="true"
                />
                <Navigation />
                {children}
                <Footer />
            </body>
        </html>
    );
}
