import generateInputs from '.';
import { getSampleDMMF } from '../../tests/getPrismaSchema';
import modelGenerate from '.'

describe('projectGenerator', () => {
  it('should files', async () => {
    const dmmf = await getSampleDMMF('complex')
    const model = await modelGenerate({
      configs: {
        output: { value: "./generated/inputs.ts", fromEnvVar: null },
        excludeInputs: ['UserCreateInput'],
      },
      dmmf,
      model: "User"
    });
    expect(model.object).toBeTruthy();
  })
})
