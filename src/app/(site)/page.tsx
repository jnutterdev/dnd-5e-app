import Link from "next/link";
import Hero from "@/components/hero";
import CampaignCard from "@/components/campaigncard";
import FellowshipCard from "@/components/fellowshipcard";
import SessionEntry from "@/components/session-entry";

const sampleParty = [
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

const sampleSessions = [
    {
        sessionNumber: 14,
        title: "The Lady's Shadow",
        date: "2026-07-25",
        summary:
            "A new bard named Clover joined the party, played a chord that made everyone glow, and the night ended in an ambush on the way home through the Lower Ward.",
        partyPresent: ["Alistair", "Clover", "Vaelen"],
    },
    {
        sessionNumber: 13,
        title: "Keys to the Mortuary",
        date: "2026-07-11",
        summary:
            "Searching for answers to Alistair's strange resurrection sigil, the party consulted the Dustmen only to awaken something ancient within the catacombs.",
        partyPresent: ["Alistair", "Vaelen", "Ignis"],
    },
];

export default function Home() {
    return (
        <div className="flex flex-col flex-1">
            {/* Hero Header */}
            <Hero />

            {/* Main Content Area */}
            <main className="max-w-[1100px] mx-auto px-6 sm:px-10 py-16 w-full space-y-16">
                {/* Campaign Spotlight */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-['Cinzel_Decorative',serif] text-2xl sm:text-3xl font-bold text-[#ddd4b0] tracking-wide m-0">
                            Active Campaign
                        </h2>
                        <Link
                            href="/campaigns"
                            className="font-['Cinzel'] text-[10px] tracking-[0.15em] uppercase text-[#6898a8] hover:text-[#a0c0c8] transition-colors"
                        >
                            All Campaigns &rarr;
                        </Link>
                    </div>
                    <CampaignCard
                        title="Sigil: City of Doors"
                        status="Active"
                        tagline="Where factions clash, belief reshapes reality, and no door leads where you think it does."
                        sessionCount={14}
                        system="D&D 5e"
                        href="/campaigns"
                    />
                </section>

                {/* The Fellowship */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-['Cinzel_Decorative',serif] text-2xl sm:text-3xl font-bold text-[#ddd4b0] tracking-wide m-0">
                            The Fellowship
                        </h2>
                        <Link
                            href="/fellowship"
                            className="font-['Cinzel'] text-[10px] tracking-[0.15em] uppercase text-[#6898a8] hover:text-[#a0c0c8] transition-colors"
                        >
                            View Roster &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {sampleParty.map((char) => (
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

                {/* Chronicles / Recent Sessions */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-['Cinzel_Decorative',serif] text-2xl sm:text-3xl font-bold text-[#ddd4b0] tracking-wide m-0">
                            Recent Chronicles
                        </h2>
                        <span className="font-['Cinzel'] text-[10px] tracking-[0.15em] uppercase text-[#9a8c7e]">
                            Last Played 25 Jul 2026
                        </span>
                    </div>
                    <div className="border border-[#4a4845] rounded-xs overflow-hidden shadow-xl">
                        {sampleSessions.map((session) => (
                            <SessionEntry
                                key={session.sessionNumber}
                                sessionNumber={session.sessionNumber}
                                title={session.title}
                                date={session.date}
                                summary={session.summary}
                                partyPresent={session.partyPresent}
                                href="/campaigns"
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
