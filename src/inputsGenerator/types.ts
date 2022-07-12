/**
 * Every version of prisma, the types are different.
 * We receive as generics
 */

export type Scalars<DecimalType = number, JsonType = any> =  {
  DateTime: {
    Input: Date;
    Output: Date;
  };
  Decimal: {
    Input: number;
    Output: DecimalType;
  };
  BigInt: {
    Input: bigint;
    Output: bigint;
  };
  Json: {
    Input: JsonType;
    Output: JsonType;
  };
  Bytes: {
    Input: any;
    Output: Buffer;
  };
  NEVER: {
    Input: void;
    Output: void;
  };
}