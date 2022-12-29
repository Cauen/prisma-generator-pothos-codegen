import { generateAllCrud, generateAllObjects, generateAllQueries, generateAllMutations } from './__generated__/autocrud';
import { builder } from './builder';

generateAllCrud()

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
