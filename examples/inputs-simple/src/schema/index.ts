import { builder } from "./builder";
import './user'
import './objects' // rest example

builder.queryType({
  fields: (t) => ({
    // testQuery: t.field({
    //   type: 'String',
    //   resolve: () => "Ok",
    // })
  }),
});

builder.mutationType({
  fields: (t) => ({
    // testMutation: t.field({
    //   type: 'String',
    //   resolve: () => "Ok",
    // })
  }),
});

export const schema = builder.toSchema({});
