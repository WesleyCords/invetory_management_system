/*
  Warnings:

  - You are about to drop the column `newValue` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `oldValue` on the `audit_logs` table. All the data in the column will be lost.
  - Added the required column `category` to the `audit_logs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `action` on the `audit_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LogCategory" AS ENUM ('SECURITY', 'INVENTORY', 'PRODUCT', 'SYSTEM');

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_productId_fkey";

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "newValue",
DROP COLUMN "oldValue",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB,
DROP COLUMN "action",
ADD COLUMN     "action" TEXT NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- DropEnum
DROP TYPE "ActionLog";

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
