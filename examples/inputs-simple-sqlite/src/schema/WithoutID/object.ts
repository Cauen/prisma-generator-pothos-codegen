
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const WithoutID = builder.prismaObject('WithoutID', {
  description: undefined, // defined inside schema as comment
  findUnique: (props) => ({ ...props  }),
  fields: (t) => ({
    name: t.exposeString('name', { description: undefined, nullable: false, }),
  }),
});
