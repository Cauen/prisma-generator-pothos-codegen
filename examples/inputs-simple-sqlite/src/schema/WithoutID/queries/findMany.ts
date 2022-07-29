import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findManyWithoutID = builder.queryFields((t) => ({
  findManyWithoutID: t.prismaField({
    type: [WithoutID],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const list = await context.db.withoutID.findMany({
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