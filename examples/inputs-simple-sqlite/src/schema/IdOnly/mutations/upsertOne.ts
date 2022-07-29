import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const upsertOneIdOnly = builder.mutationFields((t) => ({
  upsertOneIdOnly: t.prismaField({
    type: IdOnly,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.IdOnlyCreateInput, required: true }),
      update: t.arg({ type: Inputs.IdOnlyUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.idOnly.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))