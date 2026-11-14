# Emberfall Keep

> _"Where campaigns are forged and legends remembered"_

Emberfall Keep is a dedicated web platform for managing Dungeons & Dragons 5e campaigns, interactive character sheets with live combat states, session chronicles, and an indexed compendium of world lore, pantheon, bestiary, and cosmology.

Designed as a living medieval tome, the app pairs a rich atmospheric print aesthetic with a fast, modern reactive web stack.

---

## Tech Stack

| Layer               | Technology                                                                                                        |
| :------------------ | :---------------------------------------------------------------------------------------------------------------- |
| **Framework**       | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)                                               |
| **Styling**         | [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme inline` design tokens                             |
| **UI Components**   | [shadcn/ui](https://ui.shadcn.com/) + Custom Medieval Tome components                                             |
| **Database & ORM**  | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM 7](https://www.prisma.io/)                                |
| **Typography**      | Cinzel Decorative, Cinzel, IM Fell English, Almendra SC ([Bunny Fonts](https://fonts.bunny.net/))                 |
| **Iconography**     | [Font Awesome 6.5](https://fontawesome.com/) (fantasy flavor) + [Lucide React](https://lucide.dev/) (UI controls) |
| **Authentication**  | Auth.js / NextAuth (Discord OAuth with Player & Admin roles)                                                      |
| **Package Manager** | `pnpm`                                                                                                            |

---

## Design System & Atmosphere

The user interface follows the **Emberfall Keep Design Tokens**, evoking weathered parchment, iron bindings, and dim candlelight:

- **Void (`#272524`, `#302e2c`, `#3a3836`):** Deep charcoal backgrounds, surfaces, and hover states.
- **Mist (`#ddd4b0`, `#b8b098`, `#807868`):** Cream tones for headings, body copy, and numeral counters.
- **Teal (`#6898a8`, `#a0c0c8`):** Sigils, interactive accents, and rule metadata.
- **Mauve (`#c88878`):** Danger, fire, and fallen adventurer indicators.
- **Gold (`#c8b878`):** Planned campaigns and decorative ornaments.
- **Canvas:** Hardware-accelerated multi-stop radial atmosphere layer fixed beneath all views.

---

## Architecture

- **Unified Database (Zero External CMS):**
    - **Characters:** Players log in via Discord to edit and maintain their own character sheets (HP, spell slots, inventory, ability scores) with automatic ownership validation.
    - **Campaigns & Chronicles:** DMs track party rosters, invite codes, and session notes (with DM-only secret visibility filters).
    - **The Compendium:** World lore, factions, bestiary, and pantheon articles live in PostgreSQL and can be edited inline by administrators (`role: ADMIN`).

---

## Project Structure

```text
dnd-5e-app/
├── prisma/
│   ├── schema.prisma       # Database models (User, Character, Campaign, Note, Compendium)
│   └── migrations/         # SQL migration history
├── public/                 # Static brand assets and artwork
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, fonts, FontAwesome CDN, and atmosphere layer
│   │   ├── globals.css     # Tailwind v4 theme tokens and base typography
│   │   ├── page.tsx        # Home dashboard (hero, active campaign, party, recent sessions)
│   │   ├── campaigns/      # Campaign archives and session logs
│   │   ├── fellowship/     # Active party and fallen hero roster
│   │   ├── compendium/     # Indexed world lore, bestiary, and cosmology
│   │   ├── gamemasters/    # Storyteller and DM profiles
│   │   └── icon-compare/   # Side-by-side FontAwesome vs. Lucide design showcase
│   ├── components/
│   │   ├── nav.tsx         # Sticky glass navigation with EK monogram and mobile drawer
│   │   ├── footer.tsx      # Site footer with brand motto
│   │   ├── hero.tsx        # Atmospheric hero with concentric sigil seal
│   │   ├── campaigncard.tsx# Campaign status card with session and rule meta
│   │   ├── fellowshipcard.tsx # Character portrait card with sepia/grayscale treatment
│   │   ├── session-entry.tsx # 2-digit numeral timeline entry
│   │   └── page-header.tsx # Standardized banner header with breadcrumbs
│   └── lib/
│       └── utils.ts        # Class merging utilities (cn)
├── next.config.ts          # Next.js runtime configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 20.x`
- [pnpm](https://pnpm.io/) `>= 9.x`
- [PostgreSQL](https://www.postgresql.org/) database instance (local or hosted via Neon, Supabase, etc.)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/jnutterdev/dnd-5e-app.git
cd dnd-5e-app
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dnd_db?schema=public"

# NextAuth / Auth.js (Optional for local UI dev)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-development-secret-here"
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
```

### 3. Database Migration & Client Generation

```bash
# Push schema or run migrations
pnpm prisma db push

# Generate Prisma Client
pnpm prisma generate
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## License

Private & proprietary — created for the Emberfall Keep fellowship.
