import {
  generateAllCrud,
} from './__generated__/autocrud';
import { builder } from './builder';
import { Context } from '@/server';

generateAllCrud({
  handleResolver: ({
    field,
    modelName,
    t,
    operationName,
    isPrismaField,
    type,
    resolverName,
  }) => {
    return {
      ...field,
      // Customize args
      args: {
        ...field.args,
        testParam: t.arg({ type: "String", required: false }),
      },
      // Customize resolve function
      resolve: async (...props: any[]) => {
        // Run logs
        console.log(`Called CRUD resolver ${resolverName}`, { modelName, type, operationName })

        // Access resolve function props... Props broken if (prismaField or field)
        const decreaser = isPrismaField ? 0 : 1;
        const include = isPrismaField ? props[0] : undefined; // include
        const root = props[1 - decreaser]; // root
        const args = props[2 - decreaser]; // args
        const context: Context = props[3 - decreaser]; // context
        const info = props[4 - decreaser]; // info

        // Throw errors
        if (modelName === "User" && !context.user) throw new Error("Operations on user must be authenticated");

        // Running db calls
        await context.db.user.count();

        // Complete resolve
        const resolved = await field.resolve(...props);

        // Run logs
        console.log(`Completed CRUD resolver ${resolverName}`, { modelName, type, operationName, resolved })

        return resolved
      },
      // Apply plugins
      // authScopes: {
      //   ...(type === "Query" && { public: true }),
      //   ...(type === "Mutation" && { employee: true }),
      // },
    };
  },
});

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

export const schema = builder.toSchema({});
