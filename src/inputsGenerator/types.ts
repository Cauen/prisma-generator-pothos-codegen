export type PrismaJsonValue = string | number | boolean | JsonObject | JsonArray | null
type JsonObject = {[Key in string]?: PrismaJsonValue}
interface JsonArray extends Array<PrismaJsonValue> {}

export type Scalars<DecimalType = number> =  {
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