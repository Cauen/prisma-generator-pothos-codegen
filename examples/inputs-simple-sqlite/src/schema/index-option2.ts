import {
  generateAllCrud,
  generateAllObjects,
  generateAllQueries,
  generateAllMutations,
} from './autocrud';
import { ExtraModalObject } from './ExtraModal/object.base';
import { builder } from './builder';

type Options = Parameters<typeof generateAllCrud>[0];
const options: Options = { exclude: ['ExtraModal'] };

generateAllObjects(options);
generateAllQueries();
generateAllMutations();

builder.prismaObject('ExtraModal', {
  ...ExtraModalObject,
  description: 'Extra model override description',
  fields: (t) => ({
    ...ExtraModalObject.fields(t),
    name: t.int({
      args: {
        adder: t.arg({
          type: 'Int',
          description: 'Adder arg',
          required: true,
        }),
      },
      resolve: (root, args, context, info) => root.id + args.adder,
      description: 'My field desc',
    }),
  }),
});

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
