import { Prisma } from '@prisma/client';
import {
  generateAllCrud,
  generateAllObjects,
  generateAllQueries,
  generateAllMutations,
} from './__generated__/autocrud.js';
import { builder } from './builder.js';
import { UserUpdateInputFields } from './__generated__/inputs.js';

export const UserUpdateInputCustom = builder.inputRef<Prisma.UserUpdateInput & { customArg: string }>('UserUpdateInputCustom').implement({
  fields: (t) => ({
    ...UserUpdateInputFields(t),
    customArg: t.field({ "required": true, "type": "String" }), // custom
  }),
});

generateAllObjects();
generateAllQueries({ exclude: ['Post'] });
generateAllMutations({ exclude: ['Post'] });

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
