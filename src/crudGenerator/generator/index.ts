import { DMMF } from '@prisma/generator-helper';
import { Configs } from '../../generator';
import { writeFileSafely } from '../../utils/filesystem';
import { getObjectSrc } from './object';
import { writeResolvers } from './resolvers';
import path from 'path'

/**
 * This generate all model files
 */
export type ModelGenerateOptions = { dmmf: DMMF.Document, configs: Configs, model: string }
export default function modelGenerate(options: ModelGenerateOptions) {
  const object = getObjectSrc(options)

  // ./src/schema -> ./src/schema/User/object.ts +./src/schema/User/index.ts
  const dirname = options.configs.crud?.outputFolderPath || "./generated"

  writeFileSafely(object, `${dirname}/${options.model}/object.ts`, false)
  
  const { hasMutation, hasQuery } = writeResolvers(options)
  const rootSrc = [
    `export * from './object'`,
    ...(hasMutation ? [`export * from './mutations'`] : []),
    ...(hasQuery ? [`export * from './queries'`] : []),
  ].join("\n")

  writeFileSafely(rootSrc, `${dirname}/${options.model}/index.ts`, true)

  return {
    object, hasMutation, hasQuery,
  }
}