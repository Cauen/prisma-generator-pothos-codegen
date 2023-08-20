import { makeResolver } from './resolver';

const mutationNames = [
  'createMany',
  'createOne',
  'deleteMany',
  'deleteOne',
  'updateMany',
  'updateOne',
  'upsertOne',
];
type OperationOptions = (typeof mutationNames)[number];

const makeMutation = (
  operation: OperationOptions,
  type: string,
  nullable: 'true' | 'false',
  args: string,
  resolve: string,
  isPrisma = true,
) =>
  makeResolver(
    'Mutation',
    isPrisma ? '' : "\nimport { BatchPayload } from '../../objects';",
    operation,
    type,
    nullable,
    args,
    resolve,
    isPrisma,
  );

const createManyArgs =
  '{ data: t.field({ type: [Inputs.#{modelName}CreateInput], required: true }) }';

const createManyResolver = `async (_query, _root, args, _context, _info) =>
      await #{prisma}.$transaction(args.data.map((data) => #{prisma}.#{modelNameLower}.create({ data })))`;

const createMany = makeMutation(
  'createMany',
  "['#{modelName}']",
  'false',
  createManyArgs,
  createManyResolver,
);

const createOneArgs = '{ data: t.field({ type: Inputs.#{modelName}CreateInput, required: true }) }';

const createOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.create({ data: args.data, ...query })`;

const createOne = makeMutation(
  'createOne',
  "'#{modelName}'",
  'false',
  createOneArgs,
  createOneResolver,
);

const deleteManyArgs =
  '{ where: t.field({ type: Inputs.#{modelName}WhereInput, required: true }) }';

const deleteManyResolver = `async (_root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.deleteMany({ where: args.where })`;

const deleteMany = makeMutation(
  'deleteMany',
  'BatchPayload',
  'true',
  deleteManyArgs,
  deleteManyResolver,
  false,
);

const delteOneArgs =
  '{ where: t.field({ type: Inputs.#{modelName}WhereUniqueInput, required: true }) }';

const deleteOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.delete({ where: args.where, ...query })`;

const deleteOne = makeMutation(
  'deleteOne',
  "'#{modelName}'",
  'true',
  delteOneArgs,
  deleteOneResolver,
);

const updateManyArgs = `{
      where: t.field({ type: Inputs.#{modelName}WhereInput, required: false }),
      data: t.field({ type: Inputs.#{modelName}UpdateManyMutationInput, required: true }),
    }`;

const updateManyResolver = `async (_root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.updateMany({ where: args.where || undefined, data: args.data })`;

const updateMany = makeMutation(
  'updateMany',
  'BatchPayload',
  'false',
  updateManyArgs,
  updateManyResolver,
  false,
);

const updateOneArgs = `{
      where: t.field({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.#{modelName}UpdateInput, required: true }),
    }`;

const updateOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.update({ where: args.where, data: args.data, ...query })`;

const updateOne = makeMutation(
  'updateOne',
  "'#{modelName}'",
  'true',
  updateOneArgs,
  updateOneResolver,
);

const upsertOneArgs = `{
      where: t.field({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.#{modelName}CreateInput, required: true }),
      update: t.field({ type: Inputs.#{modelName}UpdateInput, required: true }),
    }`;

const upsertOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })`;

const upsertOne = makeMutation(
  'upsertOne',
  "'#{modelName}'",
  'false',
  upsertOneArgs,
  upsertOneResolver,
);

export const mutations = {
  createMany,
  createOne,
  deleteMany,
  deleteOne,
  updateMany,
  updateOne,
  upsertOne,
};
