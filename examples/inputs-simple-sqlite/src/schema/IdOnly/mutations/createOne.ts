import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneIdOnly = builder.mutationFields((t) => ({
  createOneIdOnly: t.prismaField({
    type: IdOnly,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.IdOnlyCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.idOnly.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))