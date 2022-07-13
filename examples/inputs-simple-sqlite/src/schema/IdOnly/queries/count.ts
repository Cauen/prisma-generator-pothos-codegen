import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const countIdOnly = builder.queryFields((t) => ({
  countIdOnly: t.field({
    type: "Int",
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.IdOnlyOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.IdOnlyScalarFieldEnum], required: false }),
    },
    resolve: async (root, args, context) => {
      const count = await context.db.idOnly.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })

      return count
    }
  })
}))