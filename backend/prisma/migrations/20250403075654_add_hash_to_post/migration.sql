-- CreateTable
CREATE TABLE "SchoolCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Substitute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,
    "substituteId" INTEGER,
    "teacherId" INTEGER NOT NULL,
    CONSTRAINT "Post_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_substituteId_fkey" FOREIGN KEY ("substituteId") REFERENCES "Substitute" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SchoolCodeToSubstitute" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SchoolCodeToSubstitute_A_fkey" FOREIGN KEY ("A") REFERENCES "SchoolCode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SchoolCodeToSubstitute_B_fkey" FOREIGN KEY ("B") REFERENCES "Substitute" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SubstitutesOnSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SubstitutesOnSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SubstitutesOnSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Substitute" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolCode_code_key" ON "SchoolCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Substitute_email_key" ON "Substitute"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_hash_key" ON "Post"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolCodeToSubstitute_AB_unique" ON "_SchoolCodeToSubstitute"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolCodeToSubstitute_B_index" ON "_SchoolCodeToSubstitute"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubstitutesOnSubjects_AB_unique" ON "_SubstitutesOnSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_SubstitutesOnSubjects_B_index" ON "_SubstitutesOnSubjects"("B");
