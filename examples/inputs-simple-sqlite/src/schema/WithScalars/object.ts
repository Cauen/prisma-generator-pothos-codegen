
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const WithScalars = builder.prismaObject('WithScalars', {
  description: undefined, // defined inside schema as comment
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', { description: undefined, nullable: false, }),
    string: t.exposeString('string', { description: undefined, nullable: true, }),
    boolean: t.exposeBoolean('boolean', { description: undefined, nullable: true, }),
    int: t.exposeInt('int', { description: undefined, nullable: true, }),
    float: t.exposeFloat('float', { description: undefined, nullable: true, }),
    decimal: t.field({
      type: Inputs.Decimal,
      description: undefined,
      nullable: true,
      resolve: (parent, args, ctx) => parent.decimal
    }),
    bigint: t.field({
      type: Inputs.BigInt,
      description: undefined,
      nullable: true,
      resolve: (parent, args, ctx) => parent.bigint
    }),
    datetime: t.field({
      type: Inputs.DateTime,
      description: undefined,
      nullable: true,
      resolve: (parent, args, ctx) => parent.datetime
    }),
    bytes: t.field({
      type: Inputs.Bytes,
      description: undefined,
      nullable: true,
      resolve: (parent, args, ctx) => parent.bytes
    }),
  }),
});
