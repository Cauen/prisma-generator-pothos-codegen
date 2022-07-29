import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findManyUnrelated = builder.queryFields((t) => ({
  findManyUnrelated: t.prismaField({
    type: [Unrelated],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.UnrelatedOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.UnrelatedScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const list = await context.db.unrelated.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      })

      return list
    }
  })
}))