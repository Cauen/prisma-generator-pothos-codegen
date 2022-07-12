export const findFirst = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

const findFirst#{model} = builder.queryFields((t) => ({
  findFirst#{model}: t.prismaField({
    type: #{model},
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.#{model}OrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.#{model}ScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await #{db}.#{modelLowercase}.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      })

      return found
    }
  })
}))

export default findFirst#{model}`
