/*
  Warnings:

  - You are about to drop the column `confirm_password` on the `Dealer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Dealer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dealer" DROP COLUMN "confirm_password",
DROP COLUMN "password";
