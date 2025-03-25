/*
  Warnings:

  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_listId_fkey";

-- DropTable
DROP TABLE "List";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "ListInfo" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ListInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInfo" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "items" TEXT[],
    "finished" BOOLEAN[],
    "listId" INTEGER NOT NULL,

    CONSTRAINT "ProjectInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListInfo" ADD CONSTRAINT "ListInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInfo" ADD CONSTRAINT "ProjectInfo_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ListInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
