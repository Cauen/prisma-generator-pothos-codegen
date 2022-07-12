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

  const dirname = path.dirname(options.configs.output?.value || "./generated")
  writeFileSafely(object, `${dirname}/${options.model}/object.ts`)
  writeFileSafely(`export * from './object'`, `${dirname}/${options.model}/index.ts`)

  return {
    object,
  }
}