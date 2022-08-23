import { generateInputs } from '.';
import { getSampleDMMF } from '../tests/getPrismaSchema';

describe('inputsGenerator', () => {
  it('should generate inputs', async () => {
    const dmmf = await getSampleDMMF('complex')
    const inputs = await generateInputs(dmmf, {});
    expect(inputs).toBeTruthy();
  })
})
