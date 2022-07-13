import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findFirstWithoutID = builder.queryFields((t) => ({
  findFirstWithoutID: t.prismaField({
    type: WithoutID,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.withoutID.findFirst({
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

export default findFirstWithoutID