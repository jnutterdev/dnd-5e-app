-- CreateEnum
CREATE TYPE "CharacterStatus" AS ENUM ('ACTIVE', 'DEAD', 'RETIRED');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('PLANNING', 'ACTIVE', 'FINISHED');

-- DropIndex
DROP INDEX "CompendiumEntry_category_idx";

-- DropIndex
DROP INDEX "CompendiumEntry_slug_key";

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "status" "CampaignStatus" NOT NULL DEFAULT 'PLANNING';

-- AlterTable
ALTER TABLE "CampaignMember" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "CampaignNote" ADD COLUMN     "gameSessionId" UUID;

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "archetype",
DROP COLUMN "class",
DROP COLUMN "level",
DROP COLUMN "proficiencyBonus",
ADD COLUMN     "status" "CharacterStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "CompendiumEntry" ADD COLUMN     "campaignId" UUID NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "isPublished" SET DEFAULT false;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "CharacterClass" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "characterId" UUID NOT NULL,
    "className" TEXT NOT NULL,
    "subclass" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "isStarting" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "CharacterClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaignId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "playedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterClass_characterId_className_key" ON "CharacterClass"("characterId", "className");

-- CreateIndex
CREATE INDEX "GameSession_authorId_idx" ON "GameSession"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_campaignId_sessionNumber_key" ON "GameSession"("campaignId", "sessionNumber");

-- CreateIndex
CREATE INDEX "CampaignNote_gameSessionId_idx" ON "CampaignNote"("gameSessionId");

-- CreateIndex
CREATE INDEX "CompendiumEntry_campaignId_category_idx" ON "CompendiumEntry"("campaignId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "CompendiumEntry_campaignId_slug_key" ON "CompendiumEntry"("campaignId", "slug");

-- AddForeignKey
ALTER TABLE "CharacterClass" ADD CONSTRAINT "CharacterClass_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignNote" ADD CONSTRAINT "CampaignNote_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompendiumEntry" ADD CONSTRAINT "CompendiumEntry_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

