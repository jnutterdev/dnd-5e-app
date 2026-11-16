import PageHeader from "@/components/page-header";
import Link from "next/link";

const categories = [
    {
        title: "Lore & Factions",
        description:
            "The Great Wheel, planar factions, and cosmological histories.",
        icon: "fa-solid fa-book-atlas",
        count: "18 entries",
    },
    {
        title: "Bestiary & NPCs",
        description:
            "Notable figures, planar encounters, planar merchants, and foes.",
        icon: "fa-solid fa-dragon",
        count: "24 entries",
    },
    {
        title: "Artifacts & Relics",
        description: "Enchanted gear, planar keys, and wondrous items.",
        icon: "fa-solid fa-ring",
        count: "12 entries",
    },
    {
        title: "Cartography",
        description:
            "Sigil ward maps, planar portals, and tactical battle maps.",
        icon: "fa-solid fa-map-location-dot",
        count: "6 maps",
    },
];

export default function CompendiumPage() {
    return (
        <div className="flex flex-col flex-1">
            <PageHeader
                title="The Compendium"
                subtitle="An indexed repository of lore, factions, relics, and cosmology."
                backHref="/"
                backLabel="Home"
            />

            <main className="max-w-[1100px] mx-auto px-6 sm:px-10 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.title}
                            className="p-6 bg-[#302e2c] border border-[#4a4845] rounded-xs hover:bg-[#3a3836] transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xs bg-[#3a6070]/20 border border-[#6898a8]/30 flex items-center justify-center shrink-0 text-[#a0c0c8]">
                                    <i className={`${cat.icon} text-base`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-['Cinzel'] text-base font-semibold text-[#b8b098] tracking-wide group-hover:text-[#ddd4b0] transition-colors m-0">
                                            {cat.title}
                                        </h3>
                                        <span className="font-['Cinzel'] text-[9px] uppercase tracking-wider text-[#807868]">
                                            {cat.count}
                                        </span>
                                    </div>
                                    <p className="font-serif italic text-sm text-[#b09888] m-0 leading-relaxed">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
