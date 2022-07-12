import { ConfigsOptions } from '../../../../src'

export const configs: ConfigsOptions = {
  crud: {
    inputsImporter: "import * as Inputs from \"@/schema/inputs\";",
    builderImporter: "import { builder } from \"@/schema/builder\";",
    outputPath: "../src/schema"
  },
  inputs: {
    prismaImporter: "import { prisma } from \"@/db\";",
  }
}