import { createOneWithScalarsMutationObject } from './__generated__/WithScalars';
import { builder } from './builder';

builder.queryType({
  fields: (t) => ({
    health: t.field({ type: "String", resolve: () => "Ok" }),
  }),
});
builder.mutationType({
  fields: (t) => ({
    health: t.field({ type: "String", resolve: () => "Ok" }),
  }),
});

export default builder.mutationFields((t) => {
  const createOne = createOneWithScalarsMutationObject(t)

  return {
    createOneWithScalars: t.prismaField({
      ...createOne,
      async resolve(query, arent, args, ctx, info) {
        const resolved = await createOne.resolve(query, arent, args, ctx, info)
      
        // Do something here

        return resolved
      },
    }),
  }
})

export const schema = builder.toSchema({});
