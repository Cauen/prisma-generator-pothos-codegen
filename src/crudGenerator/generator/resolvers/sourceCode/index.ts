import { firstLetterUppercase } from '../../../utils/string'
import { ModelGenerateOptions } from '../..'
import { count } from './count'
import { createMany } from './createMany'
import { createOne } from './createOne'
import { deleteMany } from './deleteMany'
import { deleteOne } from './deleteOne'
import { findFirst } from './findFirst'
import { findMany } from './findMany'
import { findUnique } from './findUnique'
import { updateMany } from './updateMany'
import { updateOne } from './updateOne'
import { upsertOne } from './upsertOne'

type ResolverProps = { type: string, name: string, srcTemplate: string }
const resolvers: ResolverProps[] = [
  { type: "Query", name: "count", srcTemplate: count },
  { type: "Mutation", name: "createMany", srcTemplate: createMany },  // CHECK
  { type: "Mutation", name: "createOne", srcTemplate: createOne }, // CHECK
  { type: "Mutation", name: "deleteMany", srcTemplate: deleteMany },
  { type: "Mutation", name: "deleteOne", srcTemplate: deleteOne },
  { type: "Query", name: "findFirst", srcTemplate: findFirst },
  { type: "Query", name: "findMany", srcTemplate: findMany },
  { type: "Query", name: "findUnique", srcTemplate: findUnique },
  { type: "Mutation", name: "updateMany", srcTemplate: updateMany }, // CHECK
  { type: "Mutation", name: "updateOne", srcTemplate: updateOne }, // CHECK
  { type: "Mutation", name: "upsertOne", srcTemplate: upsertOne },
]

const isExcludedResolver = (options: ModelGenerateOptions, name: string) => {
  const { excludeResolversContain, excludeResolversExact, includeResolversContain, includeResolversExact } = options.config.crud || {}
  if (includeResolversExact) {
    return !includeResolversExact.includes(name)
  }
  if (includeResolversContain) {
    return !includeResolversContain.some(include => name.includes(include))
  }

  if (excludeResolversExact && excludeResolversExact.includes(name)) {
    return true
  }
  if (excludeResolversContain && excludeResolversContain.some(r => name.includes(r))) {
    return true
  }
  return false
}


const parseSrc = (template: string, options: ModelGenerateOptions) => {
  const firstLetterLowercase = (s: string) => s[0]?.toLowerCase() + s.slice(1)

  return template
    .replace(/#{model}/g, options.model)
    .replace(/#{modelLowercase}/g, firstLetterLowercase(options.model))
    .replace(/#{modelUppercase}/g, firstLetterUppercase(options.model))
    .replace(/#{db}/g, options.config.crud?.dbCaller || "context.db")
    .replace(/#{imports}\n/g, options.config.crud?.resolversImports || '')
}

export const getResolversSrcs = (options: ModelGenerateOptions) => {
  return resolvers
    .filter(r => {
      const nameWithModel = `${r.name}${options.model}` // findFirstUser
      const excluded = isExcludedResolver(options, nameWithModel)
      return !excluded
    })
    .map(({ type, name, srcTemplate }) => ({
      type, // Query or Mutation
      name, // findFirst
      src: parseSrc(srcTemplate, options), // source code
    }))
}