import { useTemplate } from '../../utils/template';
import { makeResolver } from './resolver';

const queryNames = ['findFirst', 'findMany', 'count', 'findUnique'] as const;
type OperationOptions = (typeof queryNames)[number];

const makeQuery = (
  operation: OperationOptions,
  type: string,
  nullable: 'true' | 'false',
  isPrisma = true,
  args?: string,
  resolve?: string,
) =>
  makeResolver(
    'Query',
    '',
    operation,
    type,
    nullable,
    args ?? useTemplate(queryListArgsTemplate, {}, ['modelName', 'modelNameUpper']),
    resolve ??
      useTemplate(
        queryListResolveTemplate,
        {
          operation,
          query: isPrisma ? '\n        ...query,' : '',
          argsQuery: isPrisma ? 'query, ' : '',
        },
        ['prisma', 'modelNameLower'],
      ),
    isPrisma,
  );

const queryListArgsTemplate = `{
  where: t.field({ type: Inputs.#{modelName}WhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.#{modelName}OrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.#{modelName}WhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.#{modelNameUpper}ScalarFieldEnum], required: false }),
}`;

const queryListResolveTemplate = `async (#{argsQuery}_root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.#{operation}({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,#{query}
      })`;

const querySingleArgsTemplate = `{ where: t.field({ type: Inputs.#{modelName}WhereUniqueInput, required: true }) }`;

const querySingleResolveTemplate = `async (query, _root, args, _context, _info) =>
      await #{prisma}.#{modelNameLower}.findUnique({ where: args.where, ...query })`;

const findFirst = makeQuery('findFirst', "'#{modelName}'", 'true');

const findMany = makeQuery('findMany', "['#{modelName}']", 'false');

const count = makeQuery('count', "'Int'", 'false', false);

const findUnique = makeQuery(
  'findUnique',
  "'#{modelName}'",
  'true',
  true,
  useTemplate(querySingleArgsTemplate, {}, ['modelName']),
  useTemplate(querySingleResolveTemplate, {}, ['prisma', 'modelNameLower']),
);

export const queries = { findFirst, findMany, count, findUnique };
