/** Types may vary between Prisma versions */
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
