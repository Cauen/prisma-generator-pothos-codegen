import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findFirstUnrelated = builder.queryFields((t) => ({
  findFirstUnrelated: t.prismaField({
    type: Unrelated,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.UnrelatedOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.UnrelatedScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.unrelated.findFirst({
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