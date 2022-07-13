import { schema } from './schema';
import { ApolloServer } from 'apollo-server'
import { User } from '@prisma/client';
import { db } from './db'

export type Context = {
  db: typeof db,
  user: User | null,
}

const server = new ApolloServer({
  schema,
  context: async ({ req }): Promise<Context> => {
    const user: User | null = await db.user.findFirst({})
    return ({
      user,
      db,
    })
  },
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})