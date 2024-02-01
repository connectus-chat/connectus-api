/*
  Warnings:

  - You are about to drop the column `created_at` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `privateKey` on the `Credential` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "publicKey" TEXT NOT NULL,
    "user_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Credential_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Credential" ("publicKey", "user_id") SELECT "publicKey", "user_id" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
