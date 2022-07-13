import { ExtendedGeneratorOptions } from "../generator";
import path from 'path'
import { ReplacerPosition } from "./filesystem";

export type ImportedConfigsOptions = {
  inputs?: {
    prismaImporter?: string // default: import { Prisma } from ".prisma/client"
    builderImporter?: string // default: import { builder } from "./builder"
    excludeInputs?: string[] // default: undefined
    excludeScalars?: string[] // default: undefined
    outputFilePath?: string // path to generate file, from project root
    replacer?: (generated: string, position: ReplacerPosition) => string // a function to replace generated source
  },
  crud?: {
    disabled?: boolean // disable generaton of crud. default: false
    includeResolversExact?: string[] // generate only resolvers with name in the list. default: undefined. ie: ['createOneUser']
    includeResolversContain?: string[] // generate only resolvers with name included in the list. default: undefined. ie: ['User'].
    excludeResolversExact?: string[] // default: undefined. ie: ['createOneComment']
    excludeResolversContain?: string[] // default: undefined. ie: ['createOne']
    resolversImports?: string // default: what to import inside resolver
    dbCaller?: string // how to call prisma. default: context.db
    inputsImporter?: string // default: import * as Inputs from "@/generated/inputs";
    builderImporter?: string // default: import { builder } from "./builder"
    outputFolderPath?: string // path to generate files, from project root. default: ./generated
    replacer?: (generated: string, position: ReplacerPosition) => string // a function to replace generated source
  },
  global?: {
    replacer?: (generated: string, position: ReplacerPosition) => string // a function to replace generated source
  }
}
export type ConfigsOptions = ImportedConfigsOptions

export type Configs = ImportedConfigsOptions

/**
 * Receives the config path from generator options
 * Load the configs from file, and return it
 */
export const getConfig = async (extendedGeneratorOptions: ExtendedGeneratorOptions): Promise<Configs> => {
  const schemaDirName = path.dirname(extendedGeneratorOptions.schemaPath)
  const optionsPath = path.join(schemaDirName, extendedGeneratorOptions.generatorConfigPath || 'crud-generator-configs.ts')

  const optionsRequired = await import(optionsPath)
  const loadedConfigs: ImportedConfigsOptions = optionsRequired.configs || {
  }

  return loadedConfigs
}