/*
  Warnings:

  - You are about to drop the column `product_quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `product_stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_quantity",
ADD COLUMN     "product_stock" INTEGER NOT NULL;
