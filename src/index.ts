import { generatorHandler } from '@prisma/generator-helper';
import generateInputs from './inputsGenerator';

export type Options = { inputsOutput?: string }

generatorHandler({
  onManifest: () => ({
    prettyName: 'Pothos Codegen for Prisma Crud InputTypes',
    requiresGenerators: ['prisma-client-js'],
  }),
  onGenerate: async (options) => {
    const config = options.generator.config as Options

    await generateInputs(options.dmmf)
  }
});
