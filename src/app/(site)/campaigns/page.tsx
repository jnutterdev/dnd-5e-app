import PageHeader from "@/components/page-header";
import CampaignCard, { CampaignStatus } from "@/components/campaigncard";

const allCampaigns: Array<{
    title: string;
    status: CampaignStatus;
    tagline: string;
    sessionCount: number;
    system: string;
}> = [
    {
        title: "Sigil: City of Doors",
        status: "Active",
        tagline:
            "A campaign of planar intrigue, faction warfare, and the mysteries of the Lady of Pain.",
        sessionCount: 14,
        system: "D&D 5e",
    },
    {
        title: "Curse of Strahd",
        status: "Archived",
        tagline:
            "Beneath the shadow of Castle Ravenloft, four souls ventured into the mists of Barovia.",
        sessionCount: 38,
        system: "D&D 5e",
    },
    {
        title: "Netheril: Empire of Magic",
        status: "Planned",
        tagline:
            "Floating enclaves, archmages of unchecked hubris, and the twilight of an empire.",
        sessionCount: 0,
        system: "D&D 5e",
    },
];

export default function CampaignsPage() {
    return (
        <div className="flex flex-col flex-1">
            <PageHeader
                title="Chronicles & Campaigns"
                subtitle="The worlds, quests, and sagas forged at Emberfall Keep."
                backHref="/"
                backLabel="Home"
            />

            <main className="max-w-[1100px] mx-auto px-6 sm:px-10 py-12 w-full space-y-6">
                {allCampaigns.map((camp) => (
                    <CampaignCard
                        key={camp.title}
                        title={camp.title}
                        status={camp.status}
                        tagline={camp.tagline}
                        sessionCount={camp.sessionCount}
                        system={camp.system}
                        href="/campaigns"
                    />
                ))}
            </main>
        </div>
    );
}
