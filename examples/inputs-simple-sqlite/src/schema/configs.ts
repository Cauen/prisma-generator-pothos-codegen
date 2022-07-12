import { ConfigsOptions } from '../../../../src'

export const configs: ConfigsOptions = {
  crud: {
    inputsImporter: "import * as Inputs from \"@/schema/inputs\";",
    builderImporter: "import { builder } from \"@/schema/builder\";",
    outputFolderPath: "./src/schema/"
  },
  inputs: {
    prismaImporter: "import { Prisma } from \".prisma/client\";",
    outputFilePath: "./src/schema/inputs.ts"
  }
}