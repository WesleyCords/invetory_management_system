/*
  Warnings:

  - Added the required column `costPrice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "costPrice" DECIMAL(10,2) NOT NULL;
