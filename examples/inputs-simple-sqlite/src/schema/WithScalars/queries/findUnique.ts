import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findUniqueWithScalars = builder.queryFields((t) => ({
  findUniqueWithScalars: t.prismaField({
    type: WithScalars,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.withScalars.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))