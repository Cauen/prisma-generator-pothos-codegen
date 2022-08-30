import { getSampleDMMF } from '../../tests/getPrismaSchema';
import { getDefaultConfig } from '../../utils/config';
import { getInputs } from './index';

describe('getInputs', () => {
  test('should create input', async () => {
    const dmmf = await getSampleDMMF('complex');
    const builtString = `export const UserCreateInput = builder.inputRef<Prisma.UserCreateInput>('UserCreateInput').implement({`;
    const defaultConfig = getDefaultConfig();
    const includedInputs = getInputs(defaultConfig, dmmf);
    expect(includedInputs.includes(builtString)).toBe(true);
  });
});
