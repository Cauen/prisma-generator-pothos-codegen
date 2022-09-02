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
    /** How to export the inputs. Default `"export * as Inputs from '../inputs';"` */
    inputsExporter?: string;
    /** How to export the Prisma namespace. Default `"export { Prisma } from '.prisma/client';"` */
    prismaExporter?: string;
    /** How to call the prisma client. Default `'context.prisma'` */
    prismaCaller?: string;
    /** Any additional imports you might want to add to the resolvers (e.g. your prisma client). Default `''` */
    resolversImports?: string;
    /** Directory to generate crud code into from project root. Default: `'./generated'` */
    outputDir?: string;
    /** A function to replace generated source. Combined with global replacer config */
    replacer?: Replacer<'crud'>;
  };
  /** Global config */
  global?: {
    /** A function to replace generated source */
    replacer?: Replacer;
    /** How to import the Pothos builder. Default: `'import { builder } from "./builder"'` */
    builderImporter?: string;
  };
}

/** Interface representing a configuration filled with default values where the original config was missing them, for internal purposes */
export interface ConfigInternal {
  inputs: {
    prismaImporter: string;
    builderImporter: string;
    outputFilePath: string;
    excludeScalars: string[];
    replacer: Replacer<'inputs'>;
  };
  crud: {
    disabled: boolean;
    builderImporter: string;
    inputsExporter: string;
    prismaExporter: string;
    prismaCaller: string;
    resolversImports: string;
    outputDir: string;
    replacer: Replacer<'crud'>;
  };
  global: {
    replacer: Replacer;
  };
}

export const getDefaultConfig: (global?: Config['global']) => ConfigInternal = (global) => ({
  inputs: {
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    builderImporter: `import { builder } from './builder';`,
    outputFilePath: './generated/inputs.ts',
    excludeScalars: [],
    replacer: (str) => str,
  },
  crud: {
    disabled: false,
    builderImporter: global?.builderImporter || `import { builder } from './builder';`,
    inputsExporter: `export * as Inputs from '../inputs'`,
    prismaExporter: `export { Prisma } from '.prisma/client';`,
    prismaCaller: 'context.prisma',
    resolversImports: '',
    outputDir: './generated',
    replacer: (str) => str,
  },
  global: {
    builderImporter: global?.builderImporter || `import { builder } from './builder';`,
    replacer: (str) => str,
  },
});

/** Receives the config path from generator options, loads the config from file, fills out the default values, and returns it */
export const getConfig = async (
  extendedGeneratorOptions: ExtendedGeneratorOptions,
): Promise<ConfigInternal> => {
  const schemaDirName = path.dirname(extendedGeneratorOptions.schemaPath);
  const optionsPath = path.join(
    schemaDirName,
    // TODO define and document default config file path
    extendedGeneratorOptions.generatorConfigPath || 'crud-generator-config.ts',
  );

  const optionsRequired = await import(optionsPath);
  const { inputs, crud, global }: Config = optionsRequired || {};

  const defaultConfig = getDefaultConfig(global);
  const internalConfig: ConfigInternal = {
    inputs: { ...defaultConfig.inputs, ...inputs },
    crud: { ...defaultConfig.crud, ...crud },
    global: { ...defaultConfig.global, ...global },
  };

  return internalConfig;
};
