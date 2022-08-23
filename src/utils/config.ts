import { ExtendedGeneratorOptions } from "../generator";
import path from 'path'
import { ReplacerPosition } from "./filesystem";

export type Config = {
  /** Input type generation config */
  inputs?: {
    /** Where to import the prisma client from. Default: `'import { Prisma } from ".prisma/client"'` */ 
    prismaImporter?: string 
    /** Where to import the Pothos builder from. Default: `'import { builder } from "./builder"'` */
    builderImporter?: string
    // TODO what is the default
    /** Path to the generated file from project root. Default: '.' */
    outputFilePath?: string
    /** Exclude scalars from generated output */
    excludeScalars?: string[]
    /** A function to replace generated source */
    replacer?: (generated: string, position: ReplacerPosition) => string 
    // TODO this might not be necessary anymore
    // excludeInputs?: string[]
  },
  /** CRUD generation config */
  crud?: {
    /** Disable generaton of crud. Default: `false` */
    disabled?: boolean
    /** Where to import the Pothos builder from. Default: `'import { builder } from "./builder"'` */
    builderImporter?: string
    // TODO isn't this just always equal to inputs.outputFilePath?
    // /** Where to import the inputs from. Default: `* as Inputs from ` */
    // inputsImporter?: string


    /** Directory to generate crud code in from project root. Default: `'./generated'` */
    outputDir?: string
    /** A function to replace generated source */
    replacer?: (generated: string, position: ReplacerPosition) => string 




    // TODO
    includeResolversExact?: string[] // generate only resolvers with name in the list. default: undefined. ie: ['createOneUser']
    includeResolversContain?: string[] // generate only resolvers with name included in the list. default: undefined. ie: ['User'].
    excludeResolversExact?: string[] // default: undefined. ie: ['createOneComment']
    excludeResolversContain?: string[] // default: undefined. ie: ['createOne']
    resolversImports?: string // default: what to import inside resolver
    dbCaller?: string // how to call prisma. default: context.db
  },
  /** Global config */
  global?: {
    /** A function to replace generated source */
    replacer?: (generated: string, position: ReplacerPosition) => string 
  }
}

/**
 * Receives the config path from generator options
 * Load the configs from file, and return it
 */
export const getConfig = async (extendedGeneratorOptions: ExtendedGeneratorOptions): Promise<Config> => {
  const schemaDirName = path.dirname(extendedGeneratorOptions.schemaPath)
  const optionsPath = path.join(schemaDirName, extendedGeneratorOptions.generatorConfigPath || 'crud-generator-configs.ts')

  const optionsRequired = await import(optionsPath)
  const loadedConfigs: Config = optionsRequired.configs || {}

  return loadedConfigs
}