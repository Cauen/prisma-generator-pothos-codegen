import { DMMF } from '@prisma/generator-helper';
import { Configs } from '../../generator';
import { writeFileSafely } from '@/utils/filesystem';
import { getObjectSrc } from './object';

/**
 * This generate all model files
 */
export type ModelGenerateOptions = { dmmf: DMMF.Document, configs: Configs, model: string }
export default async function modelGenerate(options: ModelGenerateOptions) {
  const object = getObjectSrc(options)

  writeFileSafely(object, `./generated/${options.model}/object.ts`)

  return {
    object,
  }
}