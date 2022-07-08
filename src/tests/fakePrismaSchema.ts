export const fakePrismaSchema = `
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
  Comments  Comment[]
  /// createdAt description
  createdAt DateTime  @default(now()) @db.Timestamp(6)
  updatedAt DateTime? @updatedAt
  Profile   Profile[]
  followers Follow[]  @relation("followers")
  following Follow[]  @relation("following")
}

model Post {
  id       Int       @id @default(autoincrement())
  title    String
  /// createdAt description
  content  String
  author   User      @relation(fields: [authorId], references: [id])
  Comments Comment[]
  authorId Int
}

model Comment {
  id       Int    @id @default(autoincrement())
  comment  String
  author   User   @relation(fields: [authorId], references: [id])
  post     Post   @relation(fields: [postId], references: [id])
  authorId Int
  postId   Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model Follow {
  fromId Int
  toId   Int
  from   User @relation("following", fields: [fromId], references: [id])
  to     User @relation("followers", fields: [toId], references: [id])

  @@id([fromId, toId], name: "compositeID")
}

model Unrelated {
  id   Int     @id @default(autoincrement())
  name String?
}

model IdOnly {
  id   Int     @id @default(autoincrement())
}

model WithoutID {
  name String @unique
}

enum Role {
  USER
  ADMIN
}

model WithScalars {
  id       Int       @id @default(autoincrement())
  string   String?
  boolean  Boolean?
  int      Int?
  float    Float?
  decimal  Decimal?
  datetime DateTime? @db.Timestamp(6)
  json     Json?
  bytes    Bytes?
}
`