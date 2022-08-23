import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { generateInputs } from './inputsGenerator';
import { generateCrud } from './crudGenerator';
import { getConfig } from './utils/config';

// Types from the generator, in `schema.prisma`
type SchemaGeneratorExtensionOptions = { generatorConfigPath?: string }

// default configs from generator, with the path option
export type ExtendedGeneratorOptions = SchemaGeneratorExtensionOptions & GeneratorOptions 

generatorHandler({
  onManifest: () => ({
    prettyName: 'Pothos Codegen for Prisma Input Types and Crud',
    requiresGenerators: ['prisma-client-js'],
    defaultOutput: "./generated/inputs.ts",
  }),
  onGenerate: async (options) => {
    const generatorConfig: ExtendedGeneratorOptions = { ...options, ...options.generator.config }
    const config = await getConfig(generatorConfig)

    await generateInputs(options.dmmf, config)
    await generateCrud(options.dmmf, config)
  }
});
