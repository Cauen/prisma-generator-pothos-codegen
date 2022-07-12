import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findFirstProfile = builder.queryFields((t) => ({
  findFirstProfile: t.prismaField({
    type: Profile,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.profile.findFirst({
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

export default findFirstProfile