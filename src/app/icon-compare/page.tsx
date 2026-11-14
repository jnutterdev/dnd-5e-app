import {
  Scroll,
  Dices,
  Users,
  User,
  Skull,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Shield,
  BookOpen,
  Sparkles,
  Swords,
  Menu,
  Heart,
  Flame,
  Crosshair,
  Compass,
} from "lucide-react";

interface IconPair {
  name: string;
  usage: string;
  faClass: string;
  lucideIcon: React.ReactNode;
  notes?: string;
}

const comparisons: IconPair[] = [
  {
    name: "Dice / D20",
    usage: "Rules system / D&D rolls",
    faClass: "fa-solid fa-dice-d20",
    lucideIcon: <Dices className="size-6 text-teal-mid" />,
    notes: "FontAwesome has a true 20-sided D20. Lucide only has 6-sided dice.",
  },
  {
    name: "Scroll",
    usage: "Session counts & chronicles",
    faClass: "fa-solid fa-scroll",
    lucideIcon: <Scroll className="size-6 text-teal-mid" />,
    notes: "Both look great. FA is filled silhouette; Lucide is clean line art.",
  },
  {
    name: "Party / Users",
    usage: "Fellowship, player rosters",
    faClass: "fa-solid fa-user-group",
    lucideIcon: <Users className="size-6 text-teal-mid" />,
    notes: "Very close match.",
  },
  {
    name: "Deceased / Skull",
    usage: "Fallen characters, deadly encounters",
    faClass: "fa-solid fa-skull",
    lucideIcon: <Skull className="size-6 text-mauve-bright" />,
    notes: "FA has classic skull shape; Lucide is geometric stylized line art.",
  },
  {
    name: "Single Character",
    usage: "Avatar fallback, player name label",
    faClass: "fa-solid fa-user",
    lucideIcon: <User className="size-6 text-teal-mid" />,
    notes: "Clean match.",
  },
  {
    name: "Calendar",
    usage: "Session dates, chronicle timelines",
    faClass: "fa-regular fa-calendar",
    lucideIcon: <Calendar className="size-6 text-teal-mid" />,
    notes: "Virtually identical.",
  },
  {
    name: "Shield / Defense",
    usage: "Armor class, factions",
    faClass: "fa-solid fa-shield-halved",
    lucideIcon: <Shield className="size-6 text-teal-mid" />,
    notes: "FA has two-tone crest; Lucide has clean outline shield.",
  },
  {
    name: "Compendium / Lore",
    usage: "Rulebooks, archives",
    faClass: "fa-solid fa-book-open",
    lucideIcon: <BookOpen className="size-6 text-teal-mid" />,
    notes: "Both convey the tome feel well.",
  },
  {
    name: "Magic / Spells",
    usage: "Spell slots, magical effects",
    faClass: "fa-solid fa-wand-magic-sparkles",
    lucideIcon: <Sparkles className="size-6 text-gold" />,
    notes: "FA has a wand; Lucide uses cluster sparkles.",
  },
  {
    name: "Combat / Weapons",
    usage: "Attacks, initiatives, skirmishes",
    faClass: "fa-solid fa-khanda",
    lucideIcon: <Swords className="size-6 text-mauve-bright" />,
    notes: "Lucide's crossed swords feel very fitting for D&D.",
  },
  {
    name: "Hit Points / Health",
    usage: "HP bars, vitals",
    faClass: "fa-solid fa-heart",
    lucideIcon: <Heart className="size-6 text-mauve-bright" />,
    notes: "Direct match.",
  },
  {
    name: "Fire / Damage",
    usage: "Conditions, spells, hazards",
    faClass: "fa-solid fa-fire",
    lucideIcon: <Flame className="size-6 text-mauve-bright" />,
    notes: "Direct match.",
  },
  {
    name: "Navigation Menu",
    usage: "Mobile nav toggle",
    faClass: "fa-solid fa-bars",
    lucideIcon: <Menu className="size-6 text-mist-mid" />,
    notes: "Standard hamburger icon.",
  },
  {
    name: "Chevron Navigation",
    usage: "Card arrows, breadcrumb back links",
    faClass: "fa-solid fa-chevron-right",
    lucideIcon: <ChevronRight className="size-6 text-mist-mid" />,
    notes: "Direct match.",
  },
  {
    name: "Discord Brand",
    usage: "Footer community link",
    faClass: "fa-brands fa-discord",
    lucideIcon: (
      <span className="text-xs text-muted-foreground italic">
        (No brand icons in Lucide)
      </span>
    ),
    notes: "Lucide policy excludes third-party brands (Discord, Twitter, etc.).",
  },
  {
    name: "Wizard Hat / Dragon",
    usage: "Fantasy-specific emblems",
    faClass: "fa-solid fa-hat-wizard",
    lucideIcon: (
      <span className="text-xs text-muted-foreground italic">
        (No fantasy-specific icons)
      </span>
    ),
    notes: "FontAwesome Pro/Free has fantasy packs (dragon, dungeon, wizard hat).",
  },
];

export default function IconComparePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 w-full">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-widest uppercase font-semibold text-[#6898a8] mb-2 font-mono">
          Emberfall Keep &bull; Design System
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-[#ddd4b0] font-serif mb-4">
          FontAwesome vs. Lucide
        </h1>
        <p className="text-sm md:text-base text-[#a8a090] max-w-2xl mx-auto italic">
          Side-by-side comparison of the core icons used across campaigns,
          fellowships, chronicles, and compendiums.
        </p>
      </div>

      <div className="border border-[#4a4845] bg-[#302e2c] rounded-lg overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 bg-[#272524] border-b border-[#4a4845] px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#b8b098]">
          <div className="col-span-3">Concept & Usage</div>
          <div className="col-span-3 text-center">FontAwesome (6.5)</div>
          <div className="col-span-3 text-center">Lucide React</div>
          <div className="col-span-3">Takeaway</div>
        </div>

        <div className="divide-y divide-[#4a4845]/50">
          {comparisons.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-12 items-center px-6 py-4 hover:bg-[#3a3836]/40 transition-colors"
            >
              <div className="col-span-3">
                <div className="font-semibold text-sm text-[#ddd4b0]">
                  {item.name}
                </div>
                <div className="text-xs text-[#9a8c7e]">{item.usage}</div>
              </div>

              {/* FontAwesome column */}
              <div className="col-span-3 flex flex-col items-center justify-center gap-1.5">
                <i className={`${item.faClass} text-2xl text-[#6898a8]`}></i>
                <code className="text-[10px] text-[#807868] font-mono">
                  {item.faClass.split(" ").slice(-1)[0]}
                </code>
              </div>

              {/* Lucide column */}
              <div className="col-span-3 flex flex-col items-center justify-center gap-1.5">
                {item.lucideIcon}
                <code className="text-[10px] text-[#807868] font-mono">
                  lucide-react
                </code>
              </div>

              {/* Notes */}
              <div className="col-span-3 text-xs text-[#b09888] leading-relaxed">
                {item.notes}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-6 rounded-lg bg-[#272524] border border-[#4a4845] text-sm text-[#a8a090] space-y-2">
        <h3 className="font-semibold text-[#ddd4b0] text-base">Key Observations:</h3>
        <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-[#b09888]">
          <li>
            <strong>Fantasy flavor:</strong> FontAwesome has literal D&amp;D/tabletop icons (like the true 20-sided <code className="text-[#a0c0c8]">fa-dice-d20</code>, dragons, wizard hats). Lucide only has 6-sided dice and general tech/business icons.
          </li>
          <li>
            <strong>Brand icons:</strong> Lucide does not include brand logos like Discord.
          </li>
          <li>
            <strong>Current status:</strong> Your <code className="text-[#a0c0c8]">layout.tsx</code> already loads FontAwesome 6.5.0 in the <code className="text-[#a0c0c8]">&lt;head&gt;</code>, so you can actually use both freely without installing anything new!
          </li>
        </ul>
      </div>
    </main>
  );
}
