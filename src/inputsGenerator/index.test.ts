import { fakePrismaSchema } from '@/tests/fakePrismaSchema';
import { fakePrismaSchemaSimple } from '@/tests/fakePrismaSchemaSimple';
import { DMMF } from '@prisma/generator-helper';
import * as PrismaSDK from '@prisma/sdk'
import generateInputs from '.';

describe('inputsGenerator', () => {
  it('should generate inputs', async () => {
    const dmmf = await PrismaSDK.getDMMF({
      datamodel: fakePrismaSchema,
    })
    const inputs = await generateInputs(dmmf, { output: { value: "/generated/inputs.ts", fromEnvVar: null } });
    expect(inputs).toBeTruthy();
  })
})
