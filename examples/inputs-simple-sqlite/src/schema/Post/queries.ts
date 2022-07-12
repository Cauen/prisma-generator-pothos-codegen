import { builder } from "../builder"
import { Post } from "@/schema/Post"
import * as Inputs from '@/schema/inputs'
import { db } from "@/db"

const queries = builder.queryFields((t) => ({
  findOnePost: t.field({
    type: Post,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.PostWhereInput }),
      orderBy: t.arg({ type: [Inputs.PostOrderByWithRelationInput] }),
      cursor: t.arg({ type: Inputs.PostWhereUniqueInput }),
      take: t.arg({ type: 'Int' }),
      skip: t.arg({ type: 'Int' }),
      distinct: t.arg({ type: [Inputs.PostScalarFieldEnum] }),
    },
    resolve: async (root, args) => {
      console.log({ where: args.where })
      const post = await db.post.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })

      return post
    }
  })
}))

export default queries