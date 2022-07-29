import { DMMF } from '@prisma/generator-helper';
import { Configs } from '../../generator';
import { replaceAndWriteFileSafely } from '../../utils/filesystem';
import { getObjectSrc } from './object';
import { writeResolvers } from './resolvers';

const writeObject = (src: string, options: ModelGenerateOptions) => {
  // ./src/schema -> ./src/schema/User/object.ts
  const dirname = options.configs.crud?.outputFolderPath || "./generated"
  replaceAndWriteFileSafely(options.configs, 'crud.model.object')(src, `${dirname}/${options.model}/object.ts`, true)
}

const writeIndex = (options: ModelGenerateOptions, { hasMutation, hasQuery }: { hasQuery: boolean, hasMutation: boolean }) => {
  const dirname = options.configs.crud?.outputFolderPath || "./generated"

  const rootSrc = [
    `export * from './object'`,
    ...(hasMutation ? [`export * from './mutations'`] : []),
    ...(hasQuery ? [`export * from './queries'`] : []),
  ].join("\n")

  replaceAndWriteFileSafely(options.configs, 'crud.model.index')(rootSrc, `${dirname}/${options.model}/index.ts`, true)
}

export type ModelGenerateOptions = { dmmf: DMMF.Document, configs: Configs, model: string }
/**
 * This generates:
 * - ./src/schema/User/object.ts (writeObject)
 * - ./src/schema/User/mutations/createOne.ts ... (writeResolvers)
 * - ./src/schema/User/queries/findOne.ts ... (writeResolvers)
 * - ./src/schema/User/index.ts (writeIndex)
 */
export default function modelGenerate(options: ModelGenerateOptions) {
  const object = getObjectSrc(options)

  writeObject(object, options)
  
  const { hasMutation, hasQuery } = writeResolvers(options)
  writeIndex(options, { hasMutation, hasQuery })

  return {
    object, hasMutation, hasQuery,
  }
}