import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const updateOnePost = builder.mutationFields((t) => ({
  updateOnePost: t.prismaField({
    type: Post,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.PostUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.post.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))

export default updateOnePost