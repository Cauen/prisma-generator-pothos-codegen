import { useTemplate } from '../../utils/template';
import {
  resolverTemplate,
  queryListArgsTemplate,
  queryListResolveTemplate,
  queryListResolveQueryTemplate,
  querySingleArgsTemplate,
  querySingleResolveTemplate,
} from './resolver';

const makeQuery = (operation: string, type: string, nullable: string, isPrisma = true) =>
  useTemplate(
    resolverTemplate,
    {
      operationType: 'Query',
      imports: '',
      define: isPrisma ? 'definePrismaQueryObject' : 'defineQueryObject',
      field: isPrisma ? 'prismaField' : 'field',
      operation,
      type,
      nullable,
      args: queryListArgsTemplate,
      resolve: useTemplate(
        queryListResolveTemplate,
        {
          operation,
          query: isPrisma ? queryListResolveQueryTemplate : '',
          argsQuery: isPrisma ? 'query, ' : '',
          error: isPrisma ? '' : '\n    // @ts-expect-error // TODO fix this typing bug',
        },
        ['prisma', 'modelName', 'modelNameLower'],
      ),
    },
    ['modelName', 'resolversImports'],
  );

export const findFirst = makeQuery('findFirst', "'#{modelName}'", 'true');

export const findMany = makeQuery('findMany', "['#{modelName}']", 'false');

export const count = makeQuery('count', "'Int'", 'false', false);

export const findUnique = useTemplate(
  resolverTemplate,
  {
    operation: 'findUnique',
    operationType: 'Query',
    define: 'definePrismaQueryObject',
    field: 'prismaField',
    type: "'#{modelName}'",
    nullable: 'true',
    imports: '',
    args: useTemplate(querySingleArgsTemplate, {}, ['modelName']),
    resolve: useTemplate(querySingleResolveTemplate, {}, ['prisma', 'modelName', 'modelNameLower']),
  },
  ['modelName', 'resolversImports'],
);
