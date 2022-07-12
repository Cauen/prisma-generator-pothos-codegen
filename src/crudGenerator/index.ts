import { Configs } from "../generator";
import { DMMF } from '@prisma/generator-helper';
import modelGenerate from './generator'
import { writeFileSafely } from "../utils/filesystem";
import path from 'path'

export default function generateInputs(dmmf: DMMF.Document, configs: Configs) {
  const gen = dmmf.datamodel.models.map((model) => {
    return modelGenerate({ configs, dmmf, model: model.name })
  })
  const dirname = path.dirname(configs.output?.value || "./generated")
  writeFileSafely((() => {
    return dmmf.datamodel.models.map((model) => {
      return `export * from './${model.name}'`
    }).join("\n")
  })(), `${dirname}/objects.ts`)

  return gen
}