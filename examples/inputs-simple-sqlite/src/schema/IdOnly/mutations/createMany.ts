import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyIdOnly = builder.mutationFields((t) => ({
  createManyIdOnly: t.prismaField({
    type: [IdOnly],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.IdOnlyCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.idOnly.create({
          data: data,
        }))
      )

      return list
    }
  })
}))