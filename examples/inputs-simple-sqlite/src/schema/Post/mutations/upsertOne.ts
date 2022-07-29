import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const upsertOnePost = builder.mutationFields((t) => ({
  upsertOnePost: t.prismaField({
    type: Post,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.PostCreateInput, required: true }),
      update: t.arg({ type: Inputs.PostUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.post.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))