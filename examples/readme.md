# Running examples

## With source code

- Clone this repo
- `cd examples/inputs-simple-sqlite`
- `yarn install`
- `yarn migrate`
- `yarn dev`

## Without

- Clone this repo
- `cd examples/inputs-simple-sqlite`
- `yarn install`
- `yarn add prisma-generator-pothos-codegen`
- Replace generator from `/prisma/schema.prisma` from `ts-node --transpile-only ../../src/generator.ts` to `prisma-generator-pothos-codegen`
- `yarn migrate`
- `yarn dev`