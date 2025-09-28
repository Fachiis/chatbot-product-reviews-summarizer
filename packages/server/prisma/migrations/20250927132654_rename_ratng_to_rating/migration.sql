/*
  Warnings:

  - You are about to drop the column `ratng` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `ratng`,
    ADD COLUMN `rating` TINYINT NOT NULL DEFAULT 1;
