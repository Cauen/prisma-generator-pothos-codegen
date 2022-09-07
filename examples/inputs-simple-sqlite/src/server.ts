import { User } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { db } from './db';
import { schema } from './schema';

export type Context = {
  db: typeof db;
  user: User | null;
};

const server = new ApolloServer({
  schema,
  context: async ({ req }): Promise<Context> => {
    // const user: User | null = await db.user.findFirst({});
    return {
      user: null,
      db,
    };
  },
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
