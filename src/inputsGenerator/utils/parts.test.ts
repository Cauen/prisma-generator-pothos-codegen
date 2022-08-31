import { getSampleDMMF } from '../../tests/getPrismaSchema';
import { getInputs } from './parts';

describe('getInputs', () => {
  test('should create input', async () => {
    const dmmf = await getSampleDMMF('complex');
    const builtString = `export const UserCreateInput = builder.inputRef<Prisma.UserCreateInput>('UserCreateInput').implement({`;
    const includedInputs = getInputs(dmmf);
    expect(includedInputs.includes(builtString)).toBe(true);
  });
});
