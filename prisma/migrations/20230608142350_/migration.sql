/*
  Warnings:

  - You are about to drop the column `quantity` on the `constructionitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `constructionitem` DROP COLUMN `quantity`,
    ADD COLUMN `qty` DOUBLE NULL;
