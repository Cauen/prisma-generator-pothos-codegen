import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findUniqueWithoutID = builder.queryFields((t) => ({
  findUniqueWithoutID: t.prismaField({
    type: WithoutID,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.withoutID.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))

export default findUniqueWithoutID