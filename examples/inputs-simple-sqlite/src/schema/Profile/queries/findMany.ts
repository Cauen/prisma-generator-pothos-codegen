import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findManyProfile = builder.queryFields((t) => ({
  findManyProfile: t.prismaField({
    type: [Profile],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const list = await context.db.profile.findMany({
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