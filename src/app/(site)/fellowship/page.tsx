import PageHeader from "@/components/page-header";
import FellowshipCard from "@/components/fellowshipcard";

const roster = [
    {
        name: "Alistair Thorne",
        player: "John",
        characterClass: "Paladin",
        level: 5,
        race: "Human",
        active: true,
    },
    {
        name: "Clover High-Hill",
        player: "Sarah",
        characterClass: "Bard",
        level: 5,
        race: "Halfling",
        active: true,
    },
    {
        name: "Vaelen Shadowmend",
        player: "Devin",
        characterClass: "Rogue",
        level: 5,
        race: "Elf",
        active: true,
    },
    {
        name: "Ignis Brand",
        player: "Marcus",
        characterClass: "Sorcerer",
        level: 4,
        race: "Tiefling",
        active: false,
    },
];

export default function FellowshipPage() {
    const activeChars = roster.filter((c) => c.active);
    const fallenChars = roster.filter((c) => !c.active);

    return (
        <div className="flex flex-col flex-1">
            <PageHeader
                title="The Fellowship"
                subtitle="The brave companions, wanderers, and fallen heroes of Sigil."
                backHref="/"
                backLabel="Home"
            />

            <main className="max-w-[1100px] mx-auto px-6 sm:px-10 py-12 w-full space-y-12">
                <section>
                    <h2 className="font-['Cinzel_Decorative',serif] text-xl sm:text-2xl font-bold text-[#ddd4b0] tracking-wide mb-6">
                        Active Adventurers ({activeChars.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {activeChars.map((char) => (
                            <FellowshipCard
                                key={char.name}
                                name={char.name}
                                player={char.player}
                                characterClass={char.characterClass}
                                level={char.level}
                                race={char.race}
                                active={char.active}
                                href="/fellowship"
                            />
                        ))}
                    </div>
                </section>

                {fallenChars.length > 0 && (
                    <section className="pt-6 border-t border-[#4a4845]/50">
                        <h2 className="font-['Cinzel_Decorative',serif] text-xl sm:text-2xl font-bold text-[#c88878] tracking-wide mb-6 flex items-center gap-2">
                            <i className="fa-solid fa-skull text-base"></i>{" "}
                            Fallen Legends ({fallenChars.length})
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {fallenChars.map((char) => (
                                <FellowshipCard
                                    key={char.name}
                                    name={char.name}
                                    player={char.player}
                                    characterClass={char.characterClass}
                                    level={char.level}
                                    race={char.race}
                                    active={char.active}
                                    href="/fellowship"
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
