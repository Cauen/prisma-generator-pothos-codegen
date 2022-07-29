import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneWithoutID = builder.mutationFields((t) => ({
  createOneWithoutID: t.prismaField({
    type: WithoutID,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.WithoutIDCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.withoutID.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))