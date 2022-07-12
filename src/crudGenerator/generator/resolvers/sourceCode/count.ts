export const count = `import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

export const count#{model} = builder.queryFields((t) => ({
  count#{model}: t.field({
    type: "Int",
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.#{model}OrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.#{model}ScalarFieldEnum], required: false }),
    },
    resolve: async (root, args, context) => {
      const count = await #{db}.#{modelLowercase}.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })

      return count
    }
  })
}))`