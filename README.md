# Emberfall Keep

> _"Where campaigns are forged and legends remembered"_

Emberfall Keep is a dedicated web platform for managing Dungeons & Dragons 5e campaigns, interactive character sheets with live combat states, session chronicles, and an indexed compendium of world lore, pantheon, bestiary, and cosmology.

Designed and crafted by **[ashtephra](https://ashtephra.com)**, an independent web studio run by John Nutter, the app pairs a living medieval tome aesthetic with a fast, modern reactive web stack.

---

## Tech Stack

| Layer               | Technology                                                                                                        |
| :------------------ | :---------------------------------------------------------------------------------------------------------------- |
| **Studio**          | [ashtephra](https://ashtephra.com) (Design & Architecture)                                                        |
| **Framework**       | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)                                               |
| **Styling**         | [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme inline` design tokens                             |
| **UI Components**   | [shadcn/ui](https://ui.shadcn.com/) + Custom Medieval Tome components                                             |
| **Database & ORM**  | [Neon](https://neon.com/) serverless PostgreSQL + [Prisma ORM 7](https://www.prisma.io/)                          |
| **Hosting**         | [Cloudflare Workers](https://workers.cloudflare.com/) (planned)                                                   |
| **Secrets Ops**     | [Doppler](https://www.doppler.com/) (cross-machine secret injection & Cloudflare sync)                            |
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
│   │   ├── footer.tsx      # Site footer with brand motto & ashtephra studio credit
│   │   ├── hero.tsx        # Atmospheric hero with concentric sigil seal
│   │   ├── campaigncard.tsx# Campaign status card with session and rule meta
│   │   ├── fellowshipcard.tsx # Character portrait card with sepia/grayscale treatment
│   │   ├── session-entry.tsx # 2-digit numeral timeline entry
│   │   └── page-header.tsx # Standardized banner header with breadcrumbs
│   └── lib/
│       ├── prisma.ts       # Prisma Client singleton
│       └── utils.ts        # Class merging utilities (cn)
├── prisma7.config.ts       # Prisma CLI config (schema path, migrations, DATABASE_URL)
├── next.config.ts          # Next.js runtime configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 20.x`
- [pnpm](https://pnpm.io/) `>= 9.x`
- [Doppler CLI](https://docs.doppler.com/docs/install-cli) (all secrets, including `DATABASE_URL`, live here)
- Access to the `emberfall-keep` [Neon](https://neon.com/) project (no local Postgres or Docker needed)
- [Neon CLI](https://neon.com/docs/cli/install) (optional, for managing branches: `pnpm add -g neon`)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/jnutterdev/dnd-5e-app.git
cd dnd-5e-app
pnpm install
```

### 2. Environment & Secrets Setup

Doppler injects secrets into memory on every machine. There is no `.env` file.

```bash
# 1. Install Doppler CLI (macOS)
brew install dopplerhq/cli/doppler

# 2. Authenticate & link repository
doppler login
doppler setup # Select project: emberfall-keep, config: dev

# 3. Start local development with injected secrets
pnpm dev:doppler
```

Secrets in Doppler: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`.

### 3. Database (Neon)

The database is the `emberfall-keep` project on Neon (AWS us-east-1, Postgres 18):

| Neon branch | Purpose     | Doppler config |
| :---------- | :---------- | :------------- |
| `main`      | Production  | `prd`          |
| `dev`       | Development | `dev`          |

`DATABASE_URL` should be the **direct** (non-pooled) connection string, since Prisma Migrate needs a direct connection.

```bash
# Generate Prisma Client
pnpm prisma generate

# Create and apply migrations against the dev branch
pnpm db:migrate

# Open Prisma Studio web dashboard
pnpm db:studio
```

Schema conventions: UUID primary keys generated by Postgres (`gen_random_uuid()`), `timestamptz` columns, and soft deletes via `deletedAt` on app models. Never hard-delete app records.

### 4. Run Development Server

```bash
# With Doppler
pnpm dev:doppler

# Or standard Next.js dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Colophon & Studio

Designed and crafted by **[ashtephra](https://ashtephra.com)**, an independent web studio run by John Nutter.

In Omnia Paratus &middot; Est. 2026
