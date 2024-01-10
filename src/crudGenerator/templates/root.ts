export const objectsTemplate = `#{prismaImporter}#{crudExportRoot}#{builderCalculatedImport}

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});

export const modelNames = [
  #{modelNames}
] as const;

export type Model = typeof modelNames[number];
`;

export const utilsTemplate = `import {
  FieldOptionsFromKind,
  InputFieldMap,
  InterfaceParam,
  MutationFieldBuilder,
  MutationFieldsShape,
  ObjectRef,
  QueryFieldBuilder,
  QueryFieldsShape,
  TypeParam,
} from '@pothos/core';
import {
  PrismaFieldOptions,
  PrismaObjectTypeOptions,
  RelatedFieldOptions,
} from '@pothos/plugin-prisma';#{builderCalculatedImport}

type Types = typeof builder extends PothosSchemaTypes.SchemaBuilder<infer T> ? T : unknown;

export const defineQuery = <Q extends QueryFieldsShape<Types>>(q: Q) => q;

export const defineQueryFunction = <Obj>(
  func: (t: QueryFieldBuilder<Types, Types['Root']>) => Obj,
) => func;

export const defineQueryObject = <
  Type extends TypeParam<Types>,
  Nullable extends boolean,
  Args extends InputFieldMap,
>(
  obj: FieldOptionsFromKind<Types, Types['Root'], Type, Nullable, Args, 'Query', Types, unknown>,
) => obj as { type: Type; nullable: Nullable; args: Args; resolve: typeof obj['resolve'] };

export const defineQueryPrismaObject = <
  Type extends keyof Types['PrismaTypes'] | [keyof Types['PrismaTypes']],
  Model extends Types['PrismaTypes'][Type extends [unknown] ? Type[0] : Type],
  Args extends InputFieldMap,
  Nullable extends boolean,
>(
  def: PrismaFieldOptions<
    Types,
    Types['Root'],
    Type,
    Model,
    Type extends [unknown] ? [ObjectRef<Model['Shape']>] : ObjectRef<Model['Shape']>,
    Args,
    Nullable,
    unknown,
    unknown,
    'Query'
  >,
) => def as { type: Type; nullable: Nullable; args: Args; resolve: typeof def['resolve'] };

export const defineMutation = <M extends MutationFieldsShape<Types>>(m: M) => m;

export const defineMutationFunction = <Obj>(
  func: (t: MutationFieldBuilder<Types, Types['Root']>) => Obj,
) => func;

export const defineMutationObject = <
  Type extends TypeParam<Types>,
  Nullable extends boolean,
  Args extends InputFieldMap,
>(
  obj: FieldOptionsFromKind<Types, Types['Root'], Type, Nullable, Args, 'Mutation', Types, unknown>,
) => obj as { type: Type; nullable: Nullable; args: Args; resolve: typeof obj['resolve'] };

export const defineMutationPrismaObject = <
  Type extends keyof Types['PrismaTypes'] | [keyof Types['PrismaTypes']],
  Model extends Types['PrismaTypes'][Type extends [unknown] ? Type[0] : Type],
  Args extends InputFieldMap,
  Nullable extends boolean,
>(
  obj: PrismaFieldOptions<
    Types,
    Types['Root'],
    Type,
    Model,
    Type extends [unknown] ? [ObjectRef<Model['Shape']>] : ObjectRef<Model['Shape']>,
    Args,
    Nullable,
    unknown,
    unknown,
    'Mutation'
  >,
) => obj as { type: Type; nullable: Nullable; args: Args; resolve: typeof obj['resolve'] };

export const defineFieldObject = <
  Name extends keyof Types['PrismaTypes'],
  Type extends TypeParam<Types>,
  Nullable extends boolean,
  Args extends InputFieldMap,
>(
  _: Name,
  obj: FieldOptionsFromKind<
    Types,
    Types['PrismaTypes'][Name]['Shape'],
    Type,
    Nullable,
    Args,
    'Object',
    unknown,
    unknown
  >,
) =>
  obj as { type: Type; nullable: Nullable; description?: string; resolve: typeof obj['resolve'] };

export const defineRelationObject = <
  ModelName extends keyof Types['PrismaTypes'],
  RelationName extends keyof Types['PrismaTypes'][ModelName]['Relations'],
  Nullable extends boolean,
  Args extends InputFieldMap,
>(
  _: ModelName,
  __: RelationName,
  obj: RelatedFieldOptions<
    Types,
    Types['PrismaTypes'][ModelName],
    RelationName,
    Nullable,
    Args,
    unknown,
    false,
    Types['PrismaTypes'][ModelName]['Shape']
  >,
) =>
  obj as {
    description: string | undefined;
    nullable: Nullable;
    args: Args;
    query: typeof obj['query'];
  };

export const defineRelationFunction = <ModelName extends keyof Types['PrismaTypes'], O>(
  _: ModelName,
  func: (
    t: PothosSchemaTypes.PrismaObjectFieldBuilder<
      Types,
      Types['PrismaTypes'][ModelName],
      false,
      Types['PrismaTypes'][ModelName]['Shape']
    >,
  ) => O,
) => func;

export const definePrismaObject = <
  Name extends keyof Types['PrismaTypes'],
  Obj extends PrismaObjectTypeOptions<
    Types,
    Types['PrismaTypes'][Name],
    InterfaceParam<Types>[],
    unknown,
    unknown,
    unknown,
    Types['PrismaTypes'][Name]['Shape']
  >,
>(
  _: Name,
  obj: Obj,
) => obj;
`;

// TODO: Refactor getParams to link model with object base, and remove any
/**
  User: {
    Object: User.UserObject,
    queries: {},
    mutations: {},
  },
  Post: {
    Object: Post.PostObject,
    queries: {
      findFirst: Post.findFirstPostQuery,
      count: Post.countPostQuery,
    },
    mutations: {
      createOne: Post.createOnePostMutation,
    },
  },
 */
export const autoCrudTemplate = `#{imports}#{builderCalculatedImport}
import * as Objects from './objects.js';

type Model = Objects.Model;

export const Cruds: Record<
  Objects.Model,
  {
    Object: any;
    queries: Record<string, Function>;
    mutations: Record<string, Function>;
  }
> = {
#{modelsGenerated}
};

const crudEntries = Object.entries(Cruds);

type ResolverType = "Query" | "Mutation";
function generateResolversByType(type: ResolverType, opts?: CrudOptions) {
  return crudEntries
    .filter(([modelName]) => includeModel(modelName, opts))
    .map(([modelName, config]) => {
      const resolverEntries = Object.entries(config[type === "Query" ? "queries" : "mutations"]);

      return resolverEntries.map(([operationName, resolverObjectDefiner]) => {
        const resolverName = operationName + modelName;
        const isntPrismaFieldList = ["count", "deleteMany", "updateMany"];
        const isPrismaField = !isntPrismaFieldList.includes(operationName);

        const getFields = (t: any) => {
          const field = resolverObjectDefiner(t);
          const handledField = opts?.handleResolver
            ? opts.handleResolver({
                field,
                modelName: modelName as Model,
                operationName,
                resolverName,
                t,
                isPrismaField,
                type,
              })
            : field;

          return {
            [resolverName]: isPrismaField
              ? t.prismaField(handledField)
              : t.field(handledField),
          }
        }

        return type === "Query"
          ? builder.queryFields((t) => getFields(t))
          : builder.mutationFields((t) => getFields(t));
      });
    });
}

export function generateAllObjects(opts?: CrudOptions) {
  return crudEntries
    .filter(([md]) => includeModel(md, opts))
    .map(([modelName, { Object }]) => {
      return builder.prismaObject(modelName as Model, Object); // Objects is all imports
    });
}

export function generateAllQueries(opts?: CrudOptions) {
  generateResolversByType("Query", opts);
}

export function generateAllMutations(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
}

export function generateAllResolvers(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
  generateResolversByType("Query", opts);
}

type CrudOptions = {
  include?: Model[];
  exclude?: Model[];
  /**
   * Caution: This is not type safe
   * Wrap all queries/mutations to override args, run extra code in resolve function (ie: throw errors, logs), apply plugins, etc.
   */
  handleResolver?: (props: {
    modelName: Model;
    field: any;
    operationName: string;
    resolverName: string;
    t: any;
    isPrismaField: boolean;
    type: ResolverType;
  }) => any;
};

const includeModel = (model: string, opts?: CrudOptions): boolean => {
  if (!opts) return true;
  if (opts.include) return opts.include.includes(model as Model);
  if (opts.exclude) return !opts.exclude.includes(model as Model);
  return true;
};

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts);
  generateAllQueries(opts);
  generateAllMutations(opts);
}
`;
