/*
  Warnings:

  - You are about to drop the column `discord` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."user_email_publicKey_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "discord",
DROP COLUMN "twitter",
DROP COLUMN "website",
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "user_socials" (
    "id" TEXT NOT NULL,
    "github" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "website" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_socials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_socials_userId_key" ON "user_socials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user_socials" ADD CONSTRAINT "user_socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
