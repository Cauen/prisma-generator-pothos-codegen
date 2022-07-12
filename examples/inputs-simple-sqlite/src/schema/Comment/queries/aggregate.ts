import { Comment } from "@/schema/Comment"
import * as Inputs from '@/schema/inputs'
import { db } from "@/db"
import { builder } from "@/schema/builder"

const querys = builder.queryFields((t) => ({
  aggregateComment: t.field({
    type: 'String',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.CommentWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
    },
    resolve: async (root, args) => {
      const user = await db.comment.aggregate({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        _avg: {
          postId: true,
        },
      })

      return JSON.stringify(user)
    }
  })
}))

export default querys