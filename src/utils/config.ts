import { ExtendedGeneratorOptions } from "../generator";
import path from 'path'

export type ImportedConfigsOptions = {
  inputs?: {
    prismaImporter?: string
    builderImporter?: string
    excludeInputs?: string[]
    excludeScalars?: string[]
    outputPath?: string
  },
  crud?: {
    inputsImporter?: string
    builderImporter?: string
    outputPath?: string
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