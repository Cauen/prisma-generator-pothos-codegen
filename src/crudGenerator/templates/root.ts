export const importsTemplate = `import {
  InterfaceParam,
  MutationFieldBuilder,
  MutationFieldsShape,
  QueryFieldBuilder,
  QueryFieldsShape,
} from '@pothos/core';
import SchemaBuilder from '@pothos/core/dts/builder';
import { PrismaObjectTypeOptions } from '@pothos/plugin-prisma';
#{builderImporter}
#{inputsExporter}
#{prismaExporter}

type Types = typeof builder extends SchemaBuilder<infer T> ? T : unknown;

export const definePrismaObject: <
  Name extends keyof Types['PrismaTypes'],
  O extends PrismaObjectTypeOptions<
    Types,
    Types['PrismaTypes'][Name],
    InterfaceParam<Types>[],
    unknown,
    unknown,
    unknown,
    Types['PrismaTypes'][Name]['Shape']
  >,
>(
  name: Name,
  obj: O,
) => O = (_, obj) => obj;

export const defineQuery: <Q extends QueryFieldsShape<Types>>(q: Q) => Q = (q) => q;
export const defineMutation: <M extends MutationFieldsShape<Types>>(m: M) => M = (m) => m;

export const defineQueryObject: <
  T extends QueryFieldBuilder<Types, Types['Root']>,
  O extends Parameters<T['field']>[0],
>(
  def: (t: T) => O,
) => (t: T) => O = (def) => def;

export const definePrismaQueryObject: <
  T extends QueryFieldBuilder<Types, Types['Root']>,
  O extends Parameters<T['prismaField']>[0],
>(
  def: (t: T) => O,
) => (t: T) => O = (def) => def;

export const defineMutationObject: <
  T extends MutationFieldBuilder<Types, Types['Root']>,
  O extends Parameters<T['field']>[0],
>(
  def: (t: T) => O,
) => (t: T) => O = (def) => def;

export const definePrismaMutationObject: <
  T extends MutationFieldBuilder<Types, Types['Root']>,
  O extends Parameters<T['prismaField']>[0],
>(
  def: (t: T) => O,
) => (t: T) => O = (def) => def;
`;

export const objectsTemplate = `#{exports}

#{builderImporter}
import { Prisma } from './imports';

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});
`;
