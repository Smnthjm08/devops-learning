/*
  Warnings:

  - A unique constraint covering the columns `[email,publicKey]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_email_publicKey_key" ON "user"("email", "publicKey");
