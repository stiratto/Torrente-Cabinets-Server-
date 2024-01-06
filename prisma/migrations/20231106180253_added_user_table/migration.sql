/*
  Warnings:

  - You are about to drop the column `role` on the `Dealer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dealer" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirm_password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'VISITOR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
