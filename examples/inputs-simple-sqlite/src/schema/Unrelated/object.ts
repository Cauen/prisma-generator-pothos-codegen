
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const Unrelated = builder.prismaObject('Unrelated', {
  description: undefined, // defined inside schema as comment
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', { description: undefined, nullable: false, }),
    name: t.exposeString('name', { description: undefined, nullable: true, }),
  }),
});
