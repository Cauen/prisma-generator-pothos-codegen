import { generatorHandler, GeneratorConfig, GeneratorOptions } from '@prisma/generator-helper';
import generateInputs from './inputsGenerator';
import crudGenerator from './crudGenerator';
import { getConfig } from './utils/config';
export { Configs } from './utils/config'

// Types from the generator, in `schema.prisma`
type SchemaGeneratorExtensionOptions = {
  generatorConfigPath?: string
}
export type ExtendedGeneratorOptions = SchemaGeneratorExtensionOptions & GeneratorOptions // default configs from generator, with the path option

generatorHandler({
  onManifest: () => ({
    prettyName: 'Pothos Codegen for Prisma Crud InputTypes',
    requiresGenerators: ['prisma-client-js'],
    defaultOutput: "./generated/inputs.ts",
  }),
  onGenerate: async (options) => {
    const config = options.generator.config
    const generatorConfigs: ExtendedGeneratorOptions = { ...options, generatorConfigPath: config.generatorConfigPath }
    const configs = getConfig(generatorConfigs)

    await generateInputs(options.dmmf, configs)
    crudGenerator(options.dmmf, configs)
  }
});
