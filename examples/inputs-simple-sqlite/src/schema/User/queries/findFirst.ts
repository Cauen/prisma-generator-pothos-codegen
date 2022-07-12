import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findFirstUser = builder.queryFields((t) => ({
  findFirstUser: t.prismaField({
    type: User,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.UserOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.UserWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.UserScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.user.findFirst({
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

export default findFirstUser