import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findUniqueUnrelated = builder.queryFields((t) => ({
  findUniqueUnrelated: t.prismaField({
    type: Unrelated,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.unrelated.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))