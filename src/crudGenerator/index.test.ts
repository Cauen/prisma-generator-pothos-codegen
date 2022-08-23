import { getSampleDMMF } from '../tests/getPrismaSchema';
import generate from '.';

describe('crudGenerator', () => {
  it('should generate all files', async () => {
    const dmmf = await getSampleDMMF('complex');
    const inputs = generate(dmmf, {});
    expect(inputs).toBeTruthy();
  });
});
