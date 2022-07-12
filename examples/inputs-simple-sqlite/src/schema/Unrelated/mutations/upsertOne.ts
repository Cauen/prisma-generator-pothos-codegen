import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const upsertOneUnrelated = builder.mutationFields((t) => ({
  upsertOneUnrelated: t.prismaField({
    type: Unrelated,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.UnrelatedCreateInput, required: true }),
      update: t.arg({ type: Inputs.UnrelatedUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.unrelated.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))

export default upsertOneUnrelated