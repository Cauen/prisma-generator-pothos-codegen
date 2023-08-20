/*
  Warnings:

  - The primary key for the `WithScalars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `WithScalars` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WithScalars" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "string" TEXT,
    "boolean" BOOLEAN,
    "int" INTEGER,
    "float" REAL,
    "decimal" DECIMAL,
    "bigint" BIGINT,
    "datetime" DATETIME,
    "bytes" BLOB
);
INSERT INTO "new_WithScalars" ("bigint", "boolean", "bytes", "datetime", "decimal", "float", "id", "int", "string") SELECT "bigint", "boolean", "bytes", "datetime", "decimal", "float", "id", "int", "string" FROM "WithScalars";
DROP TABLE "WithScalars";
ALTER TABLE "new_WithScalars" RENAME TO "WithScalars";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
