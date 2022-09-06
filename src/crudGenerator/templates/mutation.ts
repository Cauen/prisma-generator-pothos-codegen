import { makeResolver } from './resolver';

const makeMutation = (
  operation: string,
  type: string,
  nullable: 'true' | 'false',
  args: string,
  resolve: string,
  isPrisma = true,
) =>
  makeResolver(
    'Mutation',
    isPrisma ? '' : "import { BatchPayload } from '../../objects';\n",
    operation,
    type,
    nullable,
    args,
    resolve,
    isPrisma,
  );

const createManyArgs =
  '{ data: t.arg({ type: [Inputs.#{modelName}CreateInput], required: true }) }';

const createManyResolver = `async (_query, _root, args, _context, _info) =>
      await #{prisma}.$transaction(args.data.map((data) => #{prisma}.#{modelNameLower}.create({ data })))`;

export const createMany = makeMutation(
  'createMany',
  "['#{modelName}']",
  'false',
  createManyArgs,
  createManyResolver,
);

const createOneArgs = '{ data: t.arg({ type: Inputs.#{modelName}CreateInput, required: true }) }';

const createOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.create({ data: args.data, ...query })`;

export const createOne = makeMutation(
  'createOne',
  "'#{modelName}'",
  'false',
  createOneArgs,
  createOneResolver,
);

const deleteManyArgs = '{ where: t.arg({ type: Inputs.#{modelName}WhereInput, required: true }) }';

const deleteManyResolver = `async (_root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.deleteMany({ where: args.where })`;

export const deleteMany = makeMutation(
  'deleteMany',
  'BatchPayload',
  'true',
  deleteManyArgs,
  deleteManyResolver,
  false,
);

const delteOneArgs =
  '{ where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }) }';

const deleteOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.delete({ where: args.where, ...query })`;

export const deleteOne = makeMutation(
  'deleteOne',
  "'#{modelName}'",
  'true',
  delteOneArgs,
  deleteOneResolver,
);

const updateManyArgs = `{
      where: t.arg({ type: Inputs.#{modelName}WhereInput, required: false }),
      data: t.arg({ type: Inputs.#{modelName}UpdateManyMutationInput, required: true }),
    }`;

const updateManyResolver = `async (_root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.updateMany({ where: args.where || undefined, data: args.data })`;

export const updateMany = makeMutation(
  'updateMany',
  'BatchPayload',
  'false',
  updateManyArgs,
  updateManyResolver,
  false,
);

const updateOneArgs = `{
      where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.#{modelName}UpdateInput, required: true }),
    }`;

const updateOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.update({ where: args.where, data: args.data, ...query })`;

export const updateOne = makeMutation(
  'updateOne',
  "'#{modelName}'",
  'true',
  updateOneArgs,
  updateOneResolver,
);

const upsertOneArgs = `{
      where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.#{modelName}CreateInput, required: true }),
      update: t.arg({ type: Inputs.#{modelName}UpdateInput, required: true }),
    }`;

const upsertOneResolver = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query
      })`;

export const upsertOne = makeMutation(
  'upsertOne',
  "'#{modelName}'",
  'false',
  upsertOneArgs,
  upsertOneResolver,
);
