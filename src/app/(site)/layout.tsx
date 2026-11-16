import Navigation from "@/components/nav";
import Footer from "@/components/footer";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
}
