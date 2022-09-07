// /** @type {import('prisma-generator-pothos-codegen').Config} */

/** @type {import('../../../../src').Config} */
module.exports = {
  crud: {
    outputDir: './src/schema/',
    // replacer(generated, position) {
    //   return `// THIS CONTENT WAS INSERTED AT REPLACE. THE POSITION IS ${position}\n${generated}`
    // },
    excludeResolversContain: ['User'],
    prismaCaller: '_context.db',
    disabled: false,
    // inputsImporter: "import * as Inputs from '@/schema/inputs'",
  },
  inputs: {
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    outputFilePath: './src/schema/inputs.ts',
  },
  // global: {
  //   replacer: (str, section) => {
  //     if (section === 'crud.model.resolver') {
  //       return str.replace(
  //         "import * as Inputs from '../inputs'",
  //         "import * as Inputs from '../../inputs';",
  //       );
  //     }
  //     return str;
  //   },
  // },
};
