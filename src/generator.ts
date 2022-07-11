import { generatorHandler, GeneratorConfig } from '@prisma/generator-helper';
import generateInputs from './inputsGenerator';
import { debugLog } from './utils/filesystem';

export type ConfigsExtra = {
  inputsPrismaImporter?: string
  inputsBuilderImporter?: string
  excludeInputs?: string[]
  excludeScalars?: string[]
}
export type Configs = ConfigsExtra & { output: GeneratorConfig['output'] }

generatorHandler({
  onManifest: () => ({
    prettyName: 'Pothos Codegen for Prisma Crud InputTypes',
    requiresGenerators: ['prisma-client-js'],
  }),
  onGenerate: async (options) => {
    const config = options.generator.config
    const configs: Configs = { ...config, output: options.generator.output }

    await generateInputs(options.dmmf, configs)
  }
});
