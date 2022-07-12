import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findUniqueIdOnly = builder.queryFields((t) => ({
  findUniqueIdOnly: t.prismaField({
    type: IdOnly,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.idOnly.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))

export default findUniqueIdOnly