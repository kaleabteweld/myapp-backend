/*
  Warnings:

  - You are about to alter the column `unit` on the `constructionitem` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `constructionitem` MODIFY `unit` VARCHAR(191) NULL;
