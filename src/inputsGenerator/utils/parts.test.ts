import { getSampleDMMF } from '../../tests/getPrismaSchema';
import { getDefaultConfig } from '../../utils/config';
import { getInputs } from './parts';

describe('getInputs', () => {
  test('should create input', async () => {
    const dmmf = await getSampleDMMF('complex');
    const defaultConfig = getDefaultConfig();
    const builtString = `export const UserCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateInput>>('UserCreateInput').implement({`;
    const includedInputs = getInputs(defaultConfig, dmmf);
    expect(includedInputs.includes(builtString)).toBe(true);
  });

  test("should map String or Int with @id attribute to 'ID' scalar", async () => {
    const dmmf = await getSampleDMMF('complex');
    const defaultConfig = getDefaultConfig();
    const builtStrings = [
      `export const BirdWhereUniqueInputFields = (t: any) => ({
  id: t.id({"required":false}),
});`,
      `export const IdOnlyCreateManyInputFields = (t: any) => ({
  id: t.id({"required":false}),
});`,
    ];
    const includedInputs = getInputs(defaultConfig, dmmf);
    builtStrings.forEach((builtString) => {
      expect(includedInputs.includes(builtString)).toBe(true);
    });
  });
});
