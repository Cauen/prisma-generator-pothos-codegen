// /** @type {import('prisma-generator-pothos-codegen').Config} */

/** @type {import('../../../../src').Config} */
module.exports = {
  crud: {
    outputDir: './src/schema/__generated__/',
    // replacer(generated, position) {
    //   return `// THIS CONTENT WAS INSERTED AT REPLACE. THE POSITION IS ${position}\n${generated}`
    // },
    excludeResolversContain: ["User"],
    prismaCaller: '_context.db',
    disabled: false,
    builderImporter: "import { builder } from '../builder';",
    // inputsImporter: "import * as Inputs from '@/schema/inputs'",
    deleteOutputDirBeforeGenerate: true,
    exportEverythingInObjectsDotTs: true,
    prismaImporter: `import { Prisma } from '@prisma/client';`,
  },
  inputs: {
    builderImporter: "import { builder } from '../builder';",
    prismaImporter: `import { Prisma } from '@prisma/client';`,
    outputFilePath: './src/schema/__generated__/inputs.ts',
  },
  global: {
    // replacer: (str, section) => {
    //   if (section === 'crud.model.resolver') {
    //     return str.replace(
    //       "import * as Inputs from '../inputs'",
    //       "import * as Inputs from '../../inputs';",
    //     );
    //   }
    //   return str;
    // },
    // afterGenerate: (dmmf) => {
    //   console.log(dmmf)
    //   throw new Error("Owpa")
    // }
  },
};
