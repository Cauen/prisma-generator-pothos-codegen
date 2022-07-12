import generate from '.';
import { getSampleDMMF } from '../tests/getPrismaSchema';

describe('projectGenerator', () => {
  it('should generate all files', async () => {
    const dmmf = await getSampleDMMF('complex')
    const inputs = generate(dmmf, {
      output: { value: "./generated/inputs.ts", fromEnvVar: null },
      excludeInputs: ['UserCreateInput'],
    });
    expect(inputs).toBeTruthy();
  })
})
