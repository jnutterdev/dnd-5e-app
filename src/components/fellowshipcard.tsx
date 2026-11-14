import Link from "next/link";
import Image from "next/image";

export interface CharacterCardProps {
    name?: string;
    player?: string;
    characterClass?: string;
    level?: number;
    race?: string;
    active?: boolean;
    portrait?: string;
    href?: string;
}

export default function FellowshipCard({
    name = "Alistair Thorne",
    player = "John",
    characterClass = "Paladin",
    level = 5,
    race = "Human",
    active = true,
    portrait,
    href = "/fellowship",
}: CharacterCardProps) {
    return (
        <Link
            href={href}
            className="group flex flex-col bg-[#302e2c] border border-[#4a4845] overflow-hidden transition-all duration-150 hover:bg-[#3a3836] hover:border-[#ddd4b0]/25 rounded-xs"
        >
            {/* Portrait */}
            <div className="aspect-[3/4] overflow-hidden bg-[#3a3836] flex items-center justify-center relative">
                {portrait ? (
                    <Image
                        src={portrait}
                        alt={name}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover grayscale-[0.4] sepia-[0.2] mix-blend-luminosity"
                    />
                ) : (
                    <i className="fa-solid fa-user text-4xl text-[#6898a8]/25"></i>
                )}

                {!active && (
                    <span className="absolute top-2 right-2 bg-[#c88878]/20 border border-[#c88878]/40 px-1.5 py-0.5 text-[9px] text-[#c88878] rounded-xs font-['Cinzel'] tracking-wider uppercase flex items-center gap-1 font-semibold">
                        <i className="fa-solid fa-skull text-[10px]"></i> Fallen
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-3.5 flex flex-col flex-1">
                <h4 className="font-['Cinzel'] text-sm font-semibold text-[#b8b098] tracking-wide mb-1 group-hover:text-[#ddd4b0] transition-colors m-0">
                    {name}
                </h4>

                <div className="font-['Cinzel'] text-[9px] tracking-[0.1em] uppercase text-[#9a8c7e] mb-1.5 flex items-center gap-1.5 flex-wrap">
                    {race && <span>{race}</span>}
                    {race && characterClass && <span>&middot;</span>}
                    {characterClass && (
                        <span>
                            {characterClass}
                            {level ? ` ${level}` : ""}
                        </span>
                    )}
                </div>

                <div className="mt-auto pt-1 font-['Cinzel'] text-[9px] tracking-[0.08em] text-[#9a8c7e] flex items-center gap-1.5">
                    <i className="fa-solid fa-user-group text-[#6898a8] text-[8px]"></i>
                    <span>{player}</span>
                </div>
            </div>
        </Link>
    );
}

export { FellowshipCard as CharacterCard };
