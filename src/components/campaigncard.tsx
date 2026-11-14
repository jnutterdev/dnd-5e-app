import Link from "next/link";

export type CampaignStatus = "Active" | "Archived" | "Planned";

export interface CampaignCardProps {
    title?: string;
    status?: CampaignStatus;
    tagline?: string;
    sessionCount?: number;
    system?: string;
    href?: string;
}

const statusBadgeStyles: Record<CampaignStatus, string> = {
    Active: "border-[#6898a8]/40 text-[#6898a8] bg-[#6898a8]/10",
    Archived: "border-[#4a4845] text-[#807868] bg-[#4a4845]/10",
    Planned: "border-[#c8b878]/40 text-[#c8b878] bg-[#c8b878]/10",
};

export default function CampaignCard({
    title = "Sigil: City of Doors",
    status = "Active",
    tagline = "A journey through the planes, where factions clash and belief shapes the multiverse.",
    sessionCount = 14,
    system = "D&D 5e",
    href = "/campaigns",
}: CampaignCardProps) {
    return (
        <Link
            href={href}
            className="group block bg-[#302e2c] border border-[#4a4845] p-6 transition-all duration-150 hover:bg-[#3a3836] hover:border-[#ddd4b0]/25 rounded-xs"
        >
            <div className="flex items-start justify-between gap-4 mb-2.5">
                <h3 className="font-['Cinzel'] text-lg font-semibold text-[#b8b098] tracking-wide group-hover:text-[#ddd4b0] transition-colors m-0">
                    {title}
                </h3>
                <span
                    className={`font-['Cinzel'] text-[8px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-xs border shrink-0 font-semibold ${statusBadgeStyles[status]}`}
                >
                    {status}
                </span>
            </div>

            {tagline && (
                <p className="italic text-[15px] text-[#b09888] mb-4 font-serif leading-relaxed">
                    {tagline}
                </p>
            )}

            <div className="flex items-center gap-6 font-['Cinzel'] text-[9px] tracking-[0.1em] uppercase text-[#9a8c7e]">
                <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-scroll text-[#6898a8]"></i>{" "}
                    {sessionCount} sessions
                </span>
                <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-dice-d20 text-[#6898a8]"></i>{" "}
                    {system}
                </span>
            </div>
        </Link>
    );
}
