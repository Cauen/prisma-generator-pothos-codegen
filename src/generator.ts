import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { generateCrud } from './crudGenerator';
import { generateInputs } from './inputsGenerator';
import { getConfig } from './utils/config';

// Types from the generator, in `schema.prisma`
type SchemaGeneratorExtensionOptions = { generatorConfigPath?: string };

// default config from generator, with the path option
export type ExtendedGeneratorOptions = SchemaGeneratorExtensionOptions & GeneratorOptions;

generatorHandler({
  onManifest: () => ({
    prettyName: 'Pothos inputs & crud integration',
    requiresGenerators: ['prisma-client-js', 'prisma-pothos-types'],
    defaultOutput: './generated/inputs.ts',
  }),
  onGenerate: async (options) => {
    const generatorConfig: ExtendedGeneratorOptions = { ...options, ...options.generator.config };
    const config = await getConfig(generatorConfig);

    config.global.beforeGenerate(options.dmmf)
    await generateInputs(config, options.dmmf);
    await generateCrud(config, options.dmmf);
    config.global.afterGenerate(options.dmmf)
  },
});
