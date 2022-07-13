
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const Follow = builder.prismaObject('Follow', {
  description: undefined, // defined inside schema as comment
  findUnique: (fields) => ({ compositeID: fields }),
  fields: (t) => ({
    fromId: t.exposeInt('fromId', { description: undefined, nullable: false, }),
    toId: t.exposeInt('toId', { description: undefined, nullable: false, }),
    From: t.relation('From', {
      description: undefined,
      nullable: false,
      
    }),
    To: t.relation('To', {
      description: undefined,
      nullable: false,
      
    }),
  }),
});
