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
import SchemaBuilder from '@pothos/core/dts/builder';
import { PrismaFieldOptions, PrismaObjectTypeOptions } from '@pothos/plugin-prisma';
#{builderImporter}

type Types = typeof builder extends SchemaBuilder<infer T> ? T : unknown;

export const defineQuery = <Q extends QueryFieldsShape<Types>>(q: Q) => q;

export const defineQueryFunction = <O>(def: (t: QueryFieldBuilder<Types, Types['Root']>) => O) => def;

export const defineQueryObject = <
  Type extends TypeParam<Types>,
  Nullable extends boolean,
  Args extends InputFieldMap,
>(
  def: FieldOptionsFromKind<Types, Types['Root'], Type, Nullable, Args, 'Query', Types, unknown>,
) => def;

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
    'Query'
  >,
) => def as { type: Type; nullable: Nullable; args: Args; resolve: typeof def['resolve'] };

export const defineMutation = <M extends MutationFieldsShape<Types>>(m: M) => m;

export const defineMutationFunction = <O>(
  def: (t: MutationFieldBuilder<Types, Types['Root']>) => O,
) => def;

export const defineMutationObject = <
  Type extends TypeParam<Types>,
  Nullable extends boolean,
  Args extends InputFieldMap,
>(
  def: FieldOptionsFromKind<Types, Types['Root'], Type, Nullable, Args, 'Mutation', Types, unknown>,
) => def;

export const defineMutationPrismaObject = <
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
    'Mutation'
  >,
) => def as { type: Type; nullable: Nullable; args: Args; resolve: typeof def['resolve'] };

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
  >
>(
  _: Name,
  obj: Obj,
) => obj;
`;

export const objectsTemplate = `#{exports}

#{builderImporter}
#{prismaImporter}

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});
`;
