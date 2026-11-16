import PageHeader from "@/components/page-header";

const gameMasters = [
    {
        name: "John Nutter",
        handle: "ashtephra",
        campaign: "Sigil: City of Doors",
        status: "Active Campaign",
        bio: "Weaver of planar mysteries, architect of Sigil encounters, and keeper of the Lady's secrets.",
    },
];

export default function GameMastersPage() {
    return (
        <div className="flex flex-col flex-1">
            <PageHeader
                title="The Gamemasters"
                subtitle="The storytellers and dungeon masters guiding the campaigns."
                backHref="/"
                backLabel="Home"
            />

            <main className="max-w-[1100px] mx-auto px-6 sm:px-10 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gameMasters.map((gm) => (
                        <div
                            key={gm.name}
                            className="p-6 bg-[#302e2c] border border-[#4a4845] rounded-xs"
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <h3 className="font-['Cinzel'] text-lg font-semibold text-[#b8b098] tracking-wide m-0">
                                        {gm.name}
                                    </h3>
                                    <span className="font-['Cinzel'] text-[10px] tracking-widest uppercase text-[#6898a8]">
                                        @{gm.handle}
                                    </span>
                                </div>
                                <span className="font-['Cinzel'] text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-[#6898a8]/40 text-[#6898a8] bg-[#6898a8]/10 font-semibold">
                                    {gm.status}
                                </span>
                            </div>
                            <p className="font-serif italic text-sm text-[#b09888] leading-relaxed mb-4">
                                {gm.bio}
                            </p>
                            <div className="font-['Cinzel'] text-[9px] tracking-wider uppercase text-[#9a8c7e] flex items-center gap-2 pt-3 border-t border-[#4a4845]/40">
                                <i className="fa-solid fa-dice-d20 text-[#6898a8]"></i>
                                <span>Currently Running: {gm.campaign}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
