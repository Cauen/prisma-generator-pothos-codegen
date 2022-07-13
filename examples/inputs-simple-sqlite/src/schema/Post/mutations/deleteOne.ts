import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const deleteOnePost = builder.mutationFields((t) => ({
  deleteOnePost: t.prismaField({
    type: Post,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.post.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))

export default deleteOnePost