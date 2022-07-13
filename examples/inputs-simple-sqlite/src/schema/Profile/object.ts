
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const Profile = builder.prismaObject('Profile', {
  description: undefined, // defined inside schema as comment
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', { description: undefined, nullable: false, }),
    bio: t.exposeString('bio', { description: undefined, nullable: true, }),
    User: t.relation('User', {
      description: undefined,
      nullable: false,
      
    }),
    userId: t.exposeInt('userId', { description: undefined, nullable: false, }),
  }),
});
