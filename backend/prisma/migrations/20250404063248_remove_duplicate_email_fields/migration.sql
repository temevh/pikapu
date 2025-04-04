/*
  Warnings:

  - You are about to drop the column `email` on the `Substitute` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Substitute` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Substitute` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Substitute` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Substitute` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "teacherId" INTEGER,
    "substituteId" INTEGER,
    CONSTRAINT "User_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_substituteId_fkey" FOREIGN KEY ("substituteId") REFERENCES "Substitute" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,
    "substituteId" INTEGER,
    "teacherId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Post_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_substituteId_fkey" FOREIGN KEY ("substituteId") REFERENCES "Substitute" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "date", "filled", "hash", "id", "substituteId", "teacherId", "title") SELECT "content", "date", "filled", "hash", "id", "substituteId", "teacherId", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_hash_key" ON "Post"("hash");
CREATE TABLE "new_Substitute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Substitute" ("id") SELECT "id" FROM "Substitute";
DROP TABLE "Substitute";
ALTER TABLE "new_Substitute" RENAME TO "Substitute";
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Teacher" ("id") SELECT "id" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
