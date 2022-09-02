import { useTemplate } from '../../utils/template';
import {
  mutationCreateManyResolverTemplate,
  mutationCreateResolverTemplate,
  mutationDeleteManyResolverTemplate,
  mutationDeleteOneResolverTemplate,
  mutationUpdateManyArgsTemplate,
  mutationUpdateManyResolverTemplate,
  mutationUpdateOneArgsTemplate,
  mutationUpdateOneResolverTemplate,
  mutationUpsertOneArgsTemplate,
  mutationUpsertOneResolverTemplate,
  resolverTemplate,
} from './resolver';

const makeMutation = (
  operation: string,
  type: string,
  nullable: string,
  args: string,
  resolve: string,
  isPrisma = true,
) =>
  useTemplate(
    resolverTemplate,
    {
      operationType: 'Mutation',
      define: isPrisma ? 'definePrismaMutationObject' : 'defineMutationObject',
      field: isPrisma ? 'prismaField' : 'field',
      imports: isPrisma ? '' : "import { BatchPayload } from '../../objects';\n",
      operation,
      type,
      nullable,
      args,
      resolve,
    },
    ['modelName', 'resolversImports'],
  );

export const createMany = makeMutation(
  'createMany',
  "['#{modelName}']",
  'false',
  '{ data: t.arg({ type: [Inputs.#{modelName}CreateInput], required: true }) }',
  mutationCreateManyResolverTemplate,
);

export const createOne = makeMutation(
  'createOne',
  "'#{modelName}'",
  'false',
  '{ data: t.arg({ type: Inputs.#{modelName}CreateInput, required: true }) }',
  mutationCreateResolverTemplate,
);

export const deleteMany = makeMutation(
  'deleteMany',
  'BatchPayload',
  'true',
  '{ where: t.arg({ type: Inputs.#{modelName}WhereInput, required: true }) }',
  mutationDeleteManyResolverTemplate,
  false,
);

export const deleteOne = makeMutation(
  'deleteOne',
  "'#{modelName}'",
  'true',
  '{ where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }) }',
  mutationDeleteOneResolverTemplate,
);

export const updateMany = makeMutation(
  'updateMany',
  'BatchPayload',
  'false',
  mutationUpdateManyArgsTemplate,
  mutationUpdateManyResolverTemplate,
  false,
);

export const updateOne = makeMutation(
  'updateOne',
  "'#{modelName}'",
  'true',
  mutationUpdateOneArgsTemplate,
  mutationUpdateOneResolverTemplate,
);

export const upsertOne = makeMutation(
  'upsertOne',
  "'#{modelName}'",
  'false',
  mutationUpsertOneArgsTemplate,
  mutationUpsertOneResolverTemplate,
);
