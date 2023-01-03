import {
  generateAllCrud,
  generateAllObjects,
  generateAllQueries,
  generateAllMutations,
} from './__generated__/autocrud';
import { builder } from './builder';

generateAllObjects();
generateAllQueries({ exclude: ['Post'] });
generateAllMutations({ exclude: ['Post'] });

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
