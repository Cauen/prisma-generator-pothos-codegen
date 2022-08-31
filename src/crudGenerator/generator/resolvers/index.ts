import { ModelGenerateOptions } from '..';
import { replaceAndWriteFileSafely } from '../../../utils/filesystem';
import { getResolversSrcs } from './sourceCode';

type ResolverSrc = ReturnType<typeof getResolversSrcs>[number];
const writeResolver = (options: ModelGenerateOptions, resolver: ResolverSrc) => {
  const { config, model } = options;
  const dirname = config.crud?.outputDir || './generated';

  const folder = resolver.type === 'Mutation' ? 'mutations' : 'queries';
  // ./generated/User/mutations/createOne.ts
  replaceAndWriteFileSafely(options.config, 'crud.model.resolver')(
    resolver.src,
    `${dirname}/${model}/${folder}/${resolver.name}.ts`,
    true,
  );

  return resolver.src;
};

const writeQueriesAndMutationsIndex = (
  options: ModelGenerateOptions,
  { queries, mutations }: { queries: ResolverSrc[]; mutations: ResolverSrc[] },
) => {
  const mutationExports = mutations.map((src) => `export * from './${src.name}'`).join('\n');
  const queryExports = queries.map((src) => `export * from './${src.name}'`).join('\n');

  const { config, model } = options;
  const dirname = config.crud?.outputDir || './generated';

  if (mutationExports.length) {
    replaceAndWriteFileSafely(options.config, 'crud.model.resolverIndex')(
      mutationExports,
      `${dirname}/${model}/mutations/index.ts`,
      true,
    );
  }
  if (queryExports.length) {
    replaceAndWriteFileSafely(options.config, 'crud.model.resolverIndex')(
      queryExports,
      `${dirname}/${model}/queries/index.ts`,
      true,
    );
  }

  return {
    mutationExports,
    queryExports,
  };
};

export const writeResolvers = (options: ModelGenerateOptions) => {
  const srcs = getResolversSrcs(options);

  // const withInputsSrcs = srcs.filter(el => el.src.includes("Inputs.")).map(el => el.src)
  // const unifiedSrc = withInputsSrcs.join('')
  // const matches = unifiedSrc.match(/Inputs\.(\w+)/g)?.map(el => el.replace('Inputs.', ''))
  // const usedInputs = [...new Set(matches)];

  const writtenResolvers = srcs.map((src) => writeResolver(options, src));

  const mutations = srcs.filter((src) => src.type === 'Mutation');
  const queries = srcs.filter((src) => src.type === 'Query');

  const hasMutation = !!mutations.length;
  const hasQuery = !!queries.length;

  const writtenIndexes = writeQueriesAndMutationsIndex(options, { queries, mutations });

  return {
    hasMutation,
    hasQuery,
    writtenIndexes,
    writtenResolvers,
  };
};
