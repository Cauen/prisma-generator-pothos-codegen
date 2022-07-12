import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyWithoutID = builder.mutationFields((t) => ({
  createManyWithoutID: t.prismaField({
    type: [WithoutID],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.WithoutIDCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.withoutID.create({
          data: data,
        }))
      )

      return list
    }
  })
}))