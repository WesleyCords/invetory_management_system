/*
  Warnings:

  - The values [ADMIN] on the enum `RolesProfile` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RolesProfile_new" AS ENUM ('EMPLOYEE', 'MANAGER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "RolesProfile_new" USING ("role"::text::"RolesProfile_new");
ALTER TYPE "RolesProfile" RENAME TO "RolesProfile_old";
ALTER TYPE "RolesProfile_new" RENAME TO "RolesProfile";
DROP TYPE "public"."RolesProfile_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'EMPLOYEE';
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL;
