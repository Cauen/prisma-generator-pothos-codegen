import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const upsertOneWithScalars = builder.mutationFields((t) => ({
  upsertOneWithScalars: t.prismaField({
    type: WithScalars,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.WithScalarsCreateInput, required: true }),
      update: t.arg({ type: Inputs.WithScalarsUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.withScalars.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))

export default upsertOneWithScalars