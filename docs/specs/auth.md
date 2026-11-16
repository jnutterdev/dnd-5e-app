# Tech Spec: Authentication & Permissions

**Status:** Draft
**Date:** 2026-11-16
**Owner:** John

## 1. Goal

Let players, DMs, and admins sign in to Emberfall Keep with Discord, and enforce who can see and edit what across characters, campaigns, session notes, and the compendium.

### In scope

- Discord OAuth sign-in and sign-out
- Sessions, using database sessions with a short-lived signed cookie cache
- A site-wide `ADMIN` role, plus per-campaign permissions (DM, player)
- Route protection with the Next.js 16 `proxy.ts`
- Server-side permission helpers used by pages, server actions, and route handlers
- Replacing the Auth.js-shaped auth tables with Better Auth's schema

### Out of scope (for now)

- Email/password, magic links, or any provider other than Discord
- An admin UI for managing users. Promoting someone to admin is a one-off SQL update.
- Co-DMs. `Campaign.dmId` is the single DM.
- Rate limiting and audit logs

## 2. Decisions

| Topic | Decision | Why |
| :---- | :------- | :-- |
| Library | **Better Auth** (`better-auth`) | Auth.js v5 is still beta and its maintenance moved to the Better Auth team. Better Auth documents Next.js 16 `proxy.ts`. |
| Provider | Discord only | Players are already in the Discord server |
| Sessions | DB sessions + `cookieCache` (5 min) | JWT-like speed (most requests skip the DB), but sessions can still be revoked. A revoked session stays valid until its cache expires (≤ 5 min). |
| Session lifetime | Better Auth defaults: 7-day expiry, refreshed daily | Fine for a small group |
| IDs | Postgres-generated UUIDs (`gen_random_uuid()`) | Matches the rest of the schema. Configure Better Auth to not generate IDs itself. |
| Site role | `User.role` (`USER` / `ADMIN`) via Better Auth `additionalFields`, `input: false` | Users can't set their own role. Avoids the Admin plugin, which we don't need yet. |
| Campaign roles | Derived, not stored: DM = `Campaign.dmId`; player = active `CampaignMember` row | Single source of truth |
| Proxy check | Optimistic cookie check only (`getSessionCookie`) | Fast redirect for signed-out users. **Real checks happen in every page, action, and route.** |
| Public surface | Everything is behind sign-in except the `/sign-in` splash page | Decide later what (if anything) signed-out visitors should see |
| Campaign creation | Admins only | Future: a separate application/vetting flow for new DMs |

## 3. Environment & Secrets (Doppler)

| Secret | Replaces | Notes |
| :----- | :------- | :---- |
| `BETTER_AUTH_SECRET` | `NEXTAUTH_SECRET` | ≥ 32 chars, e.g. `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `NEXTAUTH_URL` | `http://localhost:3000` in `dev`; `https://emberfallkeep.com` in `prd` |
| `DISCORD_CLIENT_ID` | (unchanged) | |
| `DISCORD_CLIENT_SECRET` | (unchanged) | |

Delete `NEXTAUTH_SECRET` and `NEXTAUTH_URL` once Better Auth works.

**Discord developer portal:** add redirect URIs for each environment:

- `http://localhost:3000/api/auth/callback/discord`
- `https://emberfallkeep.com/api/auth/callback/discord` (when deploying)

## 4. Schema Changes

The four auth tables change to Better Auth's core shape. All are empty today, so this is a plain migration.

> **Verify during implementation:** the Better Auth docs didn't render exact field types. Run `pnpm dlx auth@latest generate --adapter prisma --dialect postgresql --output <tmp file>` and diff against the models below before migrating. Keep our conventions: UUIDs, `timestamptz`, DB defaults.

| Model | Change |
| :---- | :----- |
| `User` | `emailVerified` becomes `Boolean @default(false)`. `email`: see open question 1. Keeps `role` and all app relations. |
| `Session` | `sessionToken` → `token` (unique), `expires` → `expiresAt`, add `ipAddress`, `userAgent`, `createdAt`, `updatedAt` |
| `Account` | `provider` → `providerId`, `providerAccountId` → `accountId`, camelCase token fields (`accessToken`, `refreshToken`, `idToken`), add `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `password`, `createdAt`, `updatedAt` |
| `VerificationToken` | Replaced by `Verification` (`id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`) |

Auth tables keep `onDelete: Cascade` to `User`. App tables keep `Restrict` and soft deletes.

## 5. Files

```text
src/
├── proxy.ts                         # optimistic redirect for protected routes
├── lib/
│   ├── auth.ts                      # betterAuth() server config
│   ├── auth-client.ts               # createAuthClient() for client components
│   └── permissions.ts               # server-side permission helpers (section 7)
├── app/
│   ├── api/auth/[...all]/route.ts   # toNextJsHandler(auth)
│   └── sign-in/page.tsx             # splash page + "Sign in with Discord"
└── components/
    └── user-menu.tsx                # avatar + sign out, in nav.tsx
```

### `src/lib/auth.ts` (outline)

- `database: prismaAdapter(prisma, { provider: "postgresql" })`, reusing `@/lib/prisma`, which is already on the Neon adapter
- `socialProviders.discord` with `clientId` and `clientSecret` from env
- `user.additionalFields.role`: `input: false`, default `USER`
- `session.cookieCache: { enabled: true, maxAge: 300 }`
- `advanced.database.generateId: false` so Postgres generates UUIDs
- `plugins: [nextCookies()]` (must be last)

### `src/proxy.ts`

Next.js 16 replaces `middleware.ts` with `proxy.ts`. It runs on the Node.js runtime by default, and `runtime` can't be set. Use `getSessionCookie(request)` from `better-auth/cookies`. Every route is protected except `/sign-in`, `/api/auth/*`, `/terms` and `/privacy` (once added), and static assets (`_next/*`, images, favicon). If the cookie is missing, redirect to `/sign-in?next=<path>`. This check only looks for the cookie; it doesn't confirm the session is valid.

## 6. Admin Bootstrap

1. John signs in with Discord once, which creates the `User` row.
2. Run once in the Neon SQL editor (dev branch, and later prod):
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = '<john's discord email>';
   ```
3. Sign out and back in, or wait up to 5 min for the cookie cache, to pick up the role.

## 7. Permissions

All checks run on the server, using the full session from `auth.api.getSession({ headers: await headers() })`. Soft-deleted rows (`deletedAt` not null) are treated as not existing.

**Helpers in `src/lib/permissions.ts`:**

- `getCurrentUser()`: user or `null`
- `requireUser()`: user, or redirect to `/sign-in`
- `requireAdmin()`: user with `ADMIN`, or 403/redirect
- `isCampaignDm(userId, campaignId)` and `isCampaignMember(userId, campaignId)`
- One `can*` function per row of the matrix below, so pages and actions share the same rules

**Matrix.** "Admin" = `User.role = ADMIN`. "DM" = `Campaign.dmId`. "Member" = active `CampaignMember` of that campaign.

| Action | Owner | Member | DM | Admin |
| :----- | :---: | :----: | :-: | :---: |
| Create a character | ✓ (self) | | | ✓ |
| Edit character sheet (HP, inventory, etc.) | ✓ | | ✓ | ✓ |
| Set status ACTIVE ↔ RETIRED | ✓ | | ✓ | ✓ |
| Set status DEAD (or revive) | | | ✓ | ✓ |
| Soft-delete a character | | | ✓ | ✓ |
| Create campaign | — | | | ✓ |
| Edit campaign / status / invite code | | | ✓ | ✓ |
| Join campaign via invite code | — | any signed-in user | | |
| Create / edit game sessions | | | ✓ | ✓ |
| Read player-visible notes | | ✓ | ✓ | ✓ |
| Read DM-only notes | | | ✓ | ✓ |
| Write notes | author edits own | ✓ (player-visible only) | ✓ | ✓ |
| Read published lore | | ✓ | ✓ | ✓ |
| Read unpublished lore / edit lore | | | ✓ | ✓ |

## 8. UI

- **Nav:** a "Sign in" button when signed out. When signed in, the user's Discord avatar with a menu (name, sign out).
- **`/sign-in` (splash):** the only signed-out page. Atmospheric hero with the EK sigil, a one-line tagline, and a single "Sign in with Discord" button, using `authClient.signIn.social({ provider: "discord", callbackURL: next ?? "/", errorCallbackURL: "/sign-in" })`. It shows a friendly message when sign-in fails (e.g. no email on the Discord account; see open question 1).
- Signed-in users who visit `/sign-in` are redirected to `/`.
- Styling follows the existing tome design tokens.

## 9. Deployment Notes (Cloudflare Workers)

- Better Auth and the Neon adapter use Web APIs. Prisma uses the pooled `DATABASE_URL`.
- `BETTER_AUTH_URL` and the Discord redirect URI must match the production domain.
- Verify cookie behavior on the Workers preview URL before pointing the domain.

## 10. Implementation Steps

1. Add `better-auth` (new dependency). Add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` to Doppler `dev`. Add the localhost redirect URI in Discord.
2. Generate Better Auth's reference schema, update the four auth models, then create, review, and apply the migration.
3. `src/lib/auth.ts`, the route handler, and `src/lib/auth-client.ts`.
4. `/sign-in` page, plus the user menu in the nav.
5. Sign in, run the admin bootstrap SQL, and confirm `role` shows up in the session.
6. `src/lib/permissions.ts`, then `src/proxy.ts`.
7. Update the README (tech stack row and secrets list). Remove the `NEXTAUTH_*` secrets.

**Manual test checklist:** sign in, sign out, refresh while signed in, a protected route while signed out redirects to sign-in and then returns, an admin-only check passes for John and fails for a second Discord account, and deleting a session row logs the user out within 5 minutes.

## 11. Resolved

- **Email required:** yes. Better Auth's user model requires a unique email. If Discord returns none (phone-only accounts), Better Auth refuses to create the user and redirects to `errorCallbackURL`. `/sign-in` then shows: "Your Discord account needs an email address. Add one in Discord settings and try again." Confirm the exact error code during implementation. Fallback if this ever blocks a real player: a placeholder email via `mapProfileToUser` (`<discordId>@users.discord.invalid`).
- **Public pages:** everything behind sign-in. The splash page is `/sign-in`.
- **Campaign creation:** admins only. A DM vetting/application flow may come later.
- **Character status and deletion:** owners can toggle ACTIVE ↔ RETIRED. Only the DM or an admin can set DEAD or soft-delete.

## 12. Future Work

- **Terms of Service and Privacy Policy pages (required before launch):** Discord's developer portal asks for links to both for the OAuth app. Add `/terms` and `/privacy` and set the URLs in the portal. Both must be **public**, so add them to the `proxy.ts` exclusions alongside `/sign-in`. The privacy policy should cover what we store from Discord (username, email, avatar, Discord user ID, OAuth tokens), the session cookies, and the future newsletter opt-in.
- **Session-update newsletter:** an opt-in checkbox (e.g. on first sign-in or in profile settings). Having an email on file is not consent, so this needs its own fields, e.g. `User.newsletterOptIn Boolean @default(false)` and `User.newsletterOptInAt DateTime?`, plus an unsubscribe link in every email. Discord emails can change. Check whether Better Auth refreshes `User.email` from Discord on each sign-in (it may need an `overrideUserInfoOnSignIn`-style option), so we don't email a stale address.
- **DM application/vetting flow** for creating new campaigns.
- **Signed-out content:** decide what, if anything, visitors can see beyond the splash page.
