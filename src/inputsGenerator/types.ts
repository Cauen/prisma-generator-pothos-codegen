import { Decimal } from '@prisma/client/runtime';

export type PrismaJsonValue = string | number | boolean | JsonObject | JsonArray | null
type JsonObject = {[Key in string]?: PrismaJsonValue}
interface JsonArray extends Array<PrismaJsonValue> {}

export type Scalars =  {
  DateTime: {
    Input: Date;
    Output: Date;
  };
  Decimal: {
    Input: number;
    Output: Decimal;
  };
  BigInt: {
    Input: bigint;
    Output: bigint;
  };
  Json: {
    Input: PrismaJsonValue;
    Output: PrismaJsonValue;
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