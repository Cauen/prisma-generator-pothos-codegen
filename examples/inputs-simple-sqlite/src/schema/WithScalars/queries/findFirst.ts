import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findFirstWithScalars = builder.queryFields((t) => ({
  findFirstWithScalars: t.prismaField({
    type: WithScalars,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.WithScalarsOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.WithScalarsScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.withScalars.findFirst({
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

export default findFirstWithScalars