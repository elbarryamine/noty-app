/*
  Warnings:

  - Made the column `image` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Note` MODIFY `image` VARCHAR(191) NOT NULL DEFAULT '';
