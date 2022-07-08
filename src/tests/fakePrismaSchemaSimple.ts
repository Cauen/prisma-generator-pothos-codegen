export const fakePrismaSchemaSimple = `
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:mysecretpassword@localhost:5432/pothos-tests"
}

generator client {
  provider = "prisma-client-js"
  // Generate into custom location because this repo has multiple prisma schemas
  output   = "./client"
}

model User {
  id        Int       @id @default(autoincrement())
  firstName String
  /// lastname description
  lastName  String
  /// relation desc
  posts     Post[]
  createdAt DateTime  @default(now()) @db.Timestamp(6)
  updatedAt DateTime? @updatedAt
}

model Post {
  id       Int       @id @default(autoincrement())
  title    String
  content  String
  author   User      @relation(fields: [authorId], references: [id])
  authorId Int
  createdAt DateTime  @default(now()) @db.Timestamp(6)
  updatedAt DateTime? @updatedAt
}
`