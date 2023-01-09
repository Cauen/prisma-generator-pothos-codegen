// /** @type {import('prisma-generator-pothos-codegen').Config} */

/** @type {import('../utils/config').Config} */
module.exports = {
  crud: {
    outputDir: './src/schema/__generated__/',
    excludeResolversContain: ['User'],
    prismaCaller: '_context.db',
    disabled: false,
    builderImporter: "import { builder } from '../builder';",
    // inputsImporter: "import * as Inputs from '@/schema/inputs'",
    deleteOutputDirBeforeGenerate: true,
  },
  inputs: {
    builderImporter: "import { builder } from '../builder';",
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    outputFilePath: './src/schema/__generated__/inputs.ts',
  },
  global: {},
};
