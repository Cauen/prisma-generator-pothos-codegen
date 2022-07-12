import { DMMF } from '@prisma/generator-helper';
import { Configs } from '../../generator';
import { writeFileSafely } from '../../utils/filesystem';
import { getObjectSrc } from './object';
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
  writeFileSafely(`export * from './object'`, `${dirname}/${options.model}/index.ts`, false)

  return {
    object,
  }
}