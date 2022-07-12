import { ExtendedGeneratorOptions } from "../generator";
import path from 'path'

export type ImportedConfigsOptions = {
  inputs?: {
    prismaImporter?: string // default: import { Prisma } from ".prisma/client"
    builderImporter?: string // default: import { builder } from "./builder"
    excludeInputs?: string[] // default: undefined
    excludeScalars?: string[] // default: undefined
    outputFilePath?: string // path to generate file, from project root
  },
  crud?: {
    inputsImporter?: string // default: import * as Inputs from "@/generated/inputs";
    builderImporter?: string // default: import { builder } from "./builder"
    outputFolderPath?: string // path to generate files, from project root. default: ./generated
  }
}
export type ConfigsOptions = ImportedConfigsOptions

export type Configs = ImportedConfigsOptions

/**
 * Receives the config path from generator options
 * Load the configs from file, and return it
 */
export const getConfig = (extendedGeneratorOptions: ExtendedGeneratorOptions): Configs => {
  const schemaDirName = path.dirname(extendedGeneratorOptions.schemaPath)
  const optionsPath = path.join(schemaDirName, extendedGeneratorOptions.generatorConfigPath || 'crud-generator-configs.ts')

  const optionsRequired = require(optionsPath)
  const loadedConfigs: ImportedConfigsOptions = optionsRequired.configs || {
  }

  return loadedConfigs
}