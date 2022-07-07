import { fakePrismaSchema } from '@/tests/fakePrismaSchema';
import { DMMF } from '@prisma/generator-helper';
import * as PrismaSDK from '@prisma/sdk'
import generateInputs from '.';

describe('inputsGenerator', () => {
  it('should generate inputs', async () => {
    const dmmf = await PrismaSDK.getDMMF({
      datamodel: fakePrismaSchema,
    })
    const inputs = await generateInputs(dmmf);
    expect(inputs).toMatchSnapshot();
  })
})
