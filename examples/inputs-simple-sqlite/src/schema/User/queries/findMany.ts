import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findManyUser = builder.queryFields((t) => ({
  findManyUser: t.prismaField({
    type: [User],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UserWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.UserOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.UserWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.UserScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const list = await context.db.user.findMany({
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

export default findManyUser