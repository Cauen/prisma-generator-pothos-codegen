import { getSampleDMMF } from '../../tests/getPrismaSchema';
import { getDefaultConfig } from '../../utils/config';
import { getInputs } from './parts';

describe('getInputs', () => {
  test('should create input', async () => {
    const dmmf = await getSampleDMMF('complex');
    const defaultConfig = getDefaultConfig();
    const builtString = `export const UserCreateInput = builder.inputRef<Prisma.UserCreateInput>('UserCreateInput').implement({`;
    const includedInputs = getInputs(defaultConfig, dmmf);
    expect(includedInputs.includes(builtString)).toBe(true);
  });
});
