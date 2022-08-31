/** Types may vary between Prisma versions */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Scalars<DecimalType = number, JsonInput = any, JsonOutput = any> = {
  DateTime: {
    Input: Date;
    Output: Date;
  };
  Decimal: {
    Input: DecimalType;
    Output: DecimalType;
  };
  BigInt: {
    Input: bigint;
    Output: bigint;
  };
  Json: {
    Input: JsonInput;
    Output: JsonOutput;
  };
  Bytes: {
    Input: Buffer;
    Output: {
      type: 'Buffer';
      data: number[];
    };
  };
  NEVER: {
    Input: void;
    Output: void;
  };
};
