import path from 'node:path';
import type { DMMF } from '@prisma/generator-helper';
import { ExtendedGeneratorOptions } from '../generator';
import { Replacer } from './replacer';

/** Interface used to configure generator behavior */
export interface Config {
  /** Input type generation config */
  inputs?: {
    /** Create simpler inputs for easier customization and ~65% less generated code. Default: `false` */
    simple?: boolean;
    /** How to import the Prisma namespace. Default: `"import { Prisma } from '.prisma/client';"` */
    prismaImporter?: string;
    /** Path to generate the inputs file to from project root. Default: `'./generated/inputs.ts'` */
    outputFilePath?: string;
    /** List of excluded scalars from generated output */
    excludeScalars?: string[];
    /** A function to replace generated source. Combined with global replacer config */
    replacer?: Replacer<'inputs'>;
    /** Map all Prisma fields with "@id" attribute to Graphql "ID" Scalar.
     *
     * ATTENTION: Mapping non String requires a conversion inside resolver, once GraphQl ID Input are coerced to String by definition. Default: false */
    mapIdFieldsToGraphqlId?: false | 'WhereUniqueInputs';
  };
  /** CRUD generation config */
  crud?: {
    /** Disable generaton of crud. Default: `false` */
    disabled?: boolean;
    /** How to import the inputs. Default `"import * as Inputs from '../inputs';"` */
    inputsImporter?: string;
    /** How to import the Prisma namespace at the objects.ts file. Default `"import { Prisma } from '.prisma/client';"`. Please use "resolverImports" to import prismaClient at resolvers. */
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
    deleteOutputDirBeforeGenerate?: boolean;
    /** Export all crud queries/mutations/objects in objects.ts at root dir. Default: true */
    exportEverythingInObjectsDotTs?: boolean;
    /** Map all Prisma fields with "@id" attribute to Graphql "ID" Scalar. Default: 'Objects' */
    mapIdFieldsToGraphqlId?: false | 'Objects';
  };
  /** Global config */
  global?: {
    /** A function to replace generated source */
    replacer?: Replacer;
    /** Run function before generate */
    beforeGenerate?: (dmmf: DMMF.Document) => void;
    /** Run function after generate */
    afterGenerate?: (dmmf: DMMF.Document) => void;
    /** Location of builder. Default: './builder', */
    builderLocation?: string;
  };
}

/** Type representing a configuration filled with default values where the original config was missing them, for internal purposes */
export type ConfigInternal = {
  inputs: NonNullable<Required<Config['inputs']>>;
  crud: NonNullable<Required<Config['crud']>>;
  global: NonNullable<Required<Config['global']>>;
};

/** Parses the configuration file path */
export const getConfigPath = ({
  generatorConfigPath,
  schemaPath,
}: {
  generatorConfigPath?: string;
  schemaPath: string;
}): string | undefined => {
  const envConfigPath = process.env.POTHOS_CRUD_CONFIG_PATH;
  const configPath = envConfigPath || generatorConfigPath; // use env var if set

  if (!configPath) return undefined;

  const schemaDirName = path.dirname(schemaPath);
  const optionsPath = path.join(schemaDirName, configPath);

  return optionsPath;
};

/** Parses the configuration file based on the provided schema and config paths */
export const parseConfig = async (configPath: string): Promise<Config> => {
  const importedFile = await import(configPath); // throw error if dont exist
  const { crud, global, inputs }: Config = importedFile || {};

  return { crud, global, inputs };
};

export const getDefaultConfig: (global?: Config['global']) => ConfigInternal = (global) => ({
  inputs: {
    simple: false,
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    outputFilePath: './generated/inputs.ts',
    excludeScalars: [],
    replacer: (str: string) => str,
    mapIdFieldsToGraphqlId: false,
  },
  crud: {
    disabled: false,
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
    exportEverythingInObjectsDotTs: true,
    mapIdFieldsToGraphqlId: 'Objects',
  },
  global: {
    replacer: (str: string) => str,
    builderImporter: '',
    builderLocation: './builder',
    beforeGenerate: () => {
      // noop
    },
    afterGenerate: () => {
      // noop
    },
  },
});

/** Receives the config path from generator options, loads the config from file, fills out the default values, and returns it */
export const getConfig = async (
  extendedGeneratorOptions: ExtendedGeneratorOptions,
): Promise<ConfigInternal> => {
  const { generatorConfigPath, schemaPath } = extendedGeneratorOptions;
  const configPath = getConfigPath({ generatorConfigPath, schemaPath });

  if (!configPath) return getDefaultConfig();

  const { inputs, crud, global } = await parseConfig(configPath);
  const defaultConfig = getDefaultConfig(global);

  return {
    inputs: { ...defaultConfig.inputs, ...inputs },
    crud: { ...defaultConfig.crud, ...crud },
    global: { ...defaultConfig.global, ...global },
  } satisfies ConfigInternal;
};
