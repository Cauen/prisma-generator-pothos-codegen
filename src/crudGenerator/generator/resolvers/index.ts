import { writeFileSafely } from "../../../utils/filesystem"
import { ModelGenerateOptions } from ".."
import { getResolversSrcs } from "./sourceCode"
import { envs } from "../../../envs"

type ResolverSrc = ReturnType<typeof getResolversSrcs>[number]
const writeResolver = (options: ModelGenerateOptions, resolver: ResolverSrc) => {
  const { configs, model } = options
  const dirname = configs.crud?.outputFolderPath || "./generated"

  const folder = resolver.type === "Mutation" ? "mutations" : "queries"
  const src = getResolversSrcs(options)

  // ./generated/User/mutations/createOne.ts
  writeFileSafely(resolver.src, `${dirname}/${model}/${folder}/${resolver.name}.ts`, true)

  return src
}

const writeQueriesAndMutationsIndex = (options: ModelGenerateOptions, { queries, mutations }: { queries: ResolverSrc[], mutations: ResolverSrc[] }) => {
  const mutationExports = mutations.map(src => `export * from './${src.name}'`).join("\n")
  const queryExports = queries.map(src => `export * from './${src.name}'`).join("\n")

  const { configs, model } = options
  const dirname = configs.crud?.outputFolderPath || "./generated"

  writeFileSafely(mutationExports, `${dirname}/${model}/mutations/index.ts`, true)
  writeFileSafely(queryExports, `${dirname}/${model}/queries/index.ts`, true)

}

export const writeResolvers = (options: ModelGenerateOptions) => {
  const srcs = getResolversSrcs(options)

  for (const src of srcs) {
    writeResolver(options, src)
  }

  const mutations = srcs.filter(src => src.type === "Mutation")
  const queries = srcs.filter(src => src.type === "Query")

  const hasMutation = mutations.length
  const hasQuery = queries.length

  writeQueriesAndMutationsIndex(options, { queries, mutations })

  return {
    hasMutation,
    hasQuery,
  }
}