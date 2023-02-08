export const enumTemplate = `export const #{enumName} = builder.enumType('#{enumName}', {
  values: #{values} as const,
});`;

export const inputTemplate = `export const #{inputName}Fields = (t: any) => ({
  #{fields}
});
export const #{inputName} = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.#{prismaInputName}>>('#{inputName}').implement({
  fields: #{inputName}Fields,
});`;

export const dateTimeScalar = `export const DateTime = builder.scalarType('DateTime', {
  parseValue: (value) => {
    const isDateParsable = typeof value === 'string' || typeof value === 'number';
    if (!isDateParsable) throw new Error('Invalid Date type');
    const date = new Date(value);
    const isInvalidDate = date.toString() === 'Invalid Date';
    if (isInvalidDate) throw new Error('Invalid Date');
    return new Date(value);
  },
  serialize: (value) => value ? new Date(value) : null,
});`;

export const decimalScalar = `export const Decimal = builder.scalarType('Decimal', {
  serialize: (value) => value,
  parseValue: (value) => {
    if (typeof value !== 'number' && typeof value !== 'string') throw new Error('Invalid Decimal');
    return new Prisma.Decimal(value);
  },
});`;

export const bytesScalar = `export const Bytes = builder.scalarType('Bytes', {
  serialize: (value) => value,
  parseValue: (value) => {
    if (Array.isArray(value)) return Buffer.from(value);
    if (typeof value === 'string') return Buffer.from(value, 'utf8');
    throw new Error('Bytes must be string or array');
  },
});`;

export const jsonScalar = `export const Json = builder.scalarType('Json', {
  serialize: (value) => value,
});`;

export const bigIntScalar = `export const Bigint = builder.scalarType('BigInt', {
  serialize: (value) => value.toString(),
  parseValue: (value) => {
    if (typeof value !== 'string' && typeof value !== 'number') throw new Error('Invalid Bigint');
    return BigInt(value);
  },
});`;

export const neverScalar = `export const NEVER = builder.scalarType('NEVER', {
  serialize: (value) => value,
  description: 'Never fill this, its created for inputs that dont have fields',
});`;
