import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findFirstIdOnly = builder.queryFields((t) => ({
  findFirstIdOnly: t.prismaField({
    type: IdOnly,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.IdOnlyOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.IdOnlyScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.idOnly.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      })

      return found
    }
  })
}))