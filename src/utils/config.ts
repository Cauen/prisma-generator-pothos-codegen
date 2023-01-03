import { DMMF } from '@prisma/generator-helper';
import path from 'path';
import { ExtendedGeneratorOptions } from '../generator';
import { Replacer } from './replacer';

/** Interface used to configure generator behavior */
export interface Config {
  /** Input type generation config */
  inputs?: {
    /** How to import the Prisma namespace. Default: `"import { Prisma } from '.prisma/client';"` */
    prismaImporter?: string;
    /** How to import the Pothos builder. Overrides global builderImporter config. Default: `"import { builder } from './builder';"` */
    builderImporter?: string;
    /** Path to generate the inputs file to from project root. Default: `'./generated/inputs.ts'` */
    outputFilePath?: string;
    /** List of excluded scalars from generated output */
    excludeScalars?: string[];
    /** A function to replace generated source. Combined with global replacer config */
    replacer?: Replacer<'inputs'>;
  };
  /** CRUD generation config */
  crud?: {
    /** Disable generaton of crud. Default: `false` */
    disabled?: boolean;
    /** How to import the Pothos builder. Overrides global builderImporter config. Default: `"import { builder } from './builder';"` */
    builderImporter?: string;
    /** How to import the inputs. Default `"import * as Inputs from '../inputs';"` */
    inputsImporter?: string;
    /** How to import the Prisma namespace. Default `"import { Prisma } from '.prisma/client';"` */
    prismaImporter?: string;
    /** How to call the prisma client. Default `'_context.prisma'` */
    prismaCaller?: string;
    /** Any additional imports you might want to add to the resolvers (e.g. your prisma client). Default: `''` */
    resolverImports?: string;
    /** Directory to generate crud code into from project root. Default: `'./generated'` */
    outputDir?: string;
    /** A function to replace generated source. Combined with global replacer config */
    replacer?: Replacer<'crud'>;
    /** A boolean to enable/disable generation of `autocrud.ts` which can be imported in schema root to auto generate all crud objects, queries and mutations. Default: `true` */
    generateAutocrud?: boolean;
    /** An array of parts of resolver names to be excluded from generation. Ie: ["User"] Default: [] */
    excludeResolversContain?: string[];
    /** An array of resolver names to be excluded from generation. Ie: ["upsertOneComment"] Default: [] */
    excludeResolversExact?: string[];
    /** An array of parts of resolver names to be included from generation (to bypass exclude contain). Ie: if exclude ["User"], include ["UserReputation"] Default: [] */
    includeResolversContain?: string[];
    /** An array of resolver names to be included from generation (to bypass exclude contain). Ie: if exclude ["User"], include ["UserReputation"] Default: [] */
    includeResolversExact?: string[];
    /** Caution: This delete the whole folder (Only use if the folder only has auto generated contents). A boolean to delete output dir before generate. Default: False */
    deleteOutputDirBeforeGenerate?: boolean
  };
  /** Global config */
  global?: {
    /** A function to replace generated source */
    replacer?: Replacer;
    /** How to import the Pothos builder. Default: `'import { builder } from "./builder"'` */
    builderImporter?: string;
    /** Run function before generate */
    beforeGenerate?: (dmmf: DMMF.Document) => void;
    /** Run function after generate */
    afterGenerate?: (dmmf: DMMF.Document) => void;
  };
}

/** Type representing a configuration filled with default values where the original config was missing them, for internal purposes */
export type ConfigInternal = {
  inputs: NonNullable<Required<Config['inputs']>>;
  crud: NonNullable<Required<Config['crud']>>;
  global: NonNullable<Required<Config['global']>>;
};

export const getDefaultConfig: (global?: Config['global']) => ConfigInternal = (global) => ({
  inputs: {
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    builderImporter: global?.builderImporter || `import { builder } from './builder';`,
    outputFilePath: './generated/inputs.ts',
    excludeScalars: [],
    replacer: (str: string) => str,
  },
  crud: {
    disabled: false,
    builderImporter: global?.builderImporter || `import { builder } from './builder';`,
    inputsImporter: `import * as Inputs from '../inputs';`,
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    prismaCaller: '_context.prisma',
    resolverImports: '',
    outputDir: './generated',
    replacer: (str: string) => str,
    generateAutocrud: true,
    excludeResolversContain: [],
    excludeResolversExact: [],
    includeResolversContain: [],
    includeResolversExact: [],
    deleteOutputDirBeforeGenerate: false,
  },
  global: {
    replacer: (str: string) => str,
    builderImporter: '',
    beforeGenerate: () => {},
    afterGenerate: () => {},
  },
});

/** Receives the config path from generator options, loads the config from file, fills out the default values, and returns it */
export const getConfig = async (
  extendedGeneratorOptions: ExtendedGeneratorOptions,
): Promise<ConfigInternal> => {
  // Getting configs from file (if file not set, get default. If set and dont exist, throw error.)
  const { global, inputs, crud } = await (async (): Promise<Config> => {
    const { generatorConfigPath } = extendedGeneratorOptions;
    const defaultOptions = { inputs: undefined, crud: undefined, global: undefined };
    if (!generatorConfigPath) return defaultOptions;

    const schemaDirName = path.dirname(extendedGeneratorOptions.schemaPath);
    const optionsPath = path.join(schemaDirName, generatorConfigPath);
    const importedFile = await import(optionsPath); // throw error if dont exist
    const { inputs, crud, global }: Config = importedFile || {};
    return { inputs, crud, global };
  })();

  const defaultConfig = getDefaultConfig(global);
  const internalConfig: ConfigInternal = {
    inputs: { ...defaultConfig.inputs, ...inputs },
    crud: { ...defaultConfig.crud, ...crud },
    global: { ...defaultConfig.global, ...global },
  };

  return internalConfig;
};
