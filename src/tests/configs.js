// /** @type {import('prisma-generator-pothos-codegen').Config} */

/** @type {import('../utils/config').Config} */
module.exports = {
  crud: {
    outputDir: './src/schema/__generated__/',
    excludeResolversContain: ['User'],
    prismaCaller: '_context.db',
    disabled: false,
    // inputsImporter: "import * as Inputs from '@/schema/inputs'",
    deleteOutputDirBeforeGenerate: true,
  },
  inputs: {
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    outputFilePath: './src/schema/__generated__/inputs.ts',
  },
  global: {},
};
