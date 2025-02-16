/*
  Warnings:

  - You are about to drop the column `description` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the `_UserTasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cannelLink` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserTasks" DROP CONSTRAINT "_UserTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTasks" DROP CONSTRAINT "_UserTasks_B_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "description",
DROP COLUMN "points",
DROP COLUMN "title",
ADD COLUMN     "cannelLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "catsBought" INTEGER DEFAULT 0,
ADD COLUMN     "tgChatId" TEXT,
ADD COLUMN     "totalEarned" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "walletAddress" TEXT,
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "_UserTasks";

-- CreateTable
CREATE TABLE "Boost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "boostPrice" DOUBLE PRECISION NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBoost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "boostId" INTEGER NOT NULL,
    "lastBuyDate" TIMESTAMP(3),
    "isPayed" BOOLEAN DEFAULT false,
    "isPurchased" BOOLEAN DEFAULT false,
    "purchasedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBoost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBoost_userId_boostId_key" ON "UserBoost"("userId", "boostId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTask_userId_taskId_key" ON "UserTask"("userId", "taskId");

-- AddForeignKey
ALTER TABLE "UserBoost" ADD CONSTRAINT "UserBoost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBoost" ADD CONSTRAINT "UserBoost_boostId_fkey" FOREIGN KEY ("boostId") REFERENCES "Boost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
