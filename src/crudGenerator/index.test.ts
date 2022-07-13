import generate from '.';
import { getSampleDMMF } from '../tests/getPrismaSchema';

describe('crudGenerator', () => {
  it('should generate all files', async () => {
    const dmmf = await getSampleDMMF('complex')
    const inputs = generate(dmmf, {});
    expect(inputs).toBeTruthy();
  })
})
