/*
  Warnings:

  - You are about to drop the column `title` on the `page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `constructionitem` MODIFY `itemNo` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `unit` VARCHAR(191) NULL,
    MODIFY `quantity` DOUBLE NULL,
    MODIFY `rate` DOUBLE NULL,
    MODIFY `amount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `page` DROP COLUMN `title`;
