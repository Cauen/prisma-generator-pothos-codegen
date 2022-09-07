import { generateAllCrud, generateAllObjects, generateAllQueries, generateAllMutations } from './autocrud';
import { builder } from './builder';

generateAllCrud()

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
