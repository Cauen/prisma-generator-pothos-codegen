# Prisma Generator Pothos Codegen

A prisma generator plugin that auto-generates Pothos GraphQL input types and crud operations.

## Table of Contents

- [Getting Started](#getting-started)
  - [Install](#install)
  - [Basic Usage](#basic-usage)

## Getting Started

### Install

```sh
yarn add prisma-generator-pothos-codegen
```

or using npm

```sh
npm install prisma-generator-pothos-codegen
```

### Basic Usage

#### Add the generator to your schema.prisma

```
generator client {
  provider = "prisma-client-js"
}

generator pothos {
  provider = "prisma-pothos-types"
}

generator pothosCrud {
  provider = "prisma-generator-pothos-codegen"
  generatorConfigPath = "./pothoscrud.config.js"
}

/// This is a user!
model User {
  /// This is an id!
  id  String  @id
}
```

#### Add scalar types to the builder

```ts
import { Scalars } from 'prisma-generator-pothos-codegen';
import { Prisma } from '.prisma/client';

export const builder = new SchemaBuilder<{
  Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>;
}>({
  // Other builder config
});
```

#### Create a configuration file

```js
// ./pothoscrud.config.js

/** @type {import('prisma-generator-pothos-codegen').Config} */
module.exports = {
  inputs: {
    outputFilePath: './src/graphql/__generated__/inputs.ts',
    builderImporter: 'import { builder } from "@/graphql/builder";',
  },
  crud: {
    disabled: true,
  },
};
```

<details>
  <summary>Click to see configuration options</summary>
  
  ```ts
  {
    /** Input type generation config */
    inputs?: {
      /** How to import the Prisma namespace. Default: `'import { Prisma } from ".prisma/client"'` */
      prismaImporter?: string;
      /** How to import the Pothos builder. Overrides global builderImporter config. Default: `'import { builder } from "./builder"'` */
      builderImporter?: string;
      /** Path to generate the inputs file to from project root. Default: './generated/inputs.ts' */
      outputFilePath?: string;
      /** List of excluded scalars from generated output */
      excludeScalars?: string[];
      /** A function to replace generated source. Combined with global replacer config */
      replacer?: Replacer;
    };
    /** CRUD generation config */
    crud?: {
      /** Disable generaton of crud. Default: `false` */
      disabled?: boolean;
      /** How to import the Pothos builder. Overrides global builderImporter config. Default: `'import { builder } from "./builder"'` */
      builderImporter?: string;
      /** How to import the inputs. Default `'import * as Inputs from "../inputs"'` */
      inputsImporter?: string;
      /** Directory to generate crud code into from project root. Default: `'./generated'` */
      outputDir?: string;
      /** A function to replace generated source. Combined with global replacer config */
      replacer?: Replacer;
      resolversImports?: string; // default: what to import inside resolver
      dbCaller?: string; // how to call prisma. default: context.db
    };
    /** Global config */
    global?: {
      /** A function to replace generated source */
      replacer?: Replacer;
      /** How to import the Pothos builder. Default: `'import { builder } from "./builder"'` */
      builderImporter?: string;
    };
  }
```

<!-- TODO update examples -->

See example: [click here](/examples/inputs-simple-sqlite/src/schema/configs.ts)

</details>

<br />

### The tested environments:

| **Prisma Version** | **Database**      | **State** |
| ------------------ | ----------------- | --------- |
| 3.12 - 4.00        | Postgres - Sqlite | ✅        |

### Example

Check for the [example](/examples/inputs-simple-sqlite) for a running sample
![image](https://user-images.githubusercontent.com/8796757/178087266-0a852f43-a7b5-48a0-bc13-a3ece9788457.png)

## Disclosures

### Models with only relations

- We create a custom scalar `NEVER` that avoids this error: `Input Object type FollowUpdateManyMutationInput must define one or more fields.` from Graphql. if you have models that are relations-only. Like N-N fields without `no relation fields` or id-only models, we set field `_` of some operations to this scalar. If you fill this fake property, the operation will result in a error.

### BigInt rename

- As `BigInt` is reserved, we export `Bigint` for the BigInt scalar.

## Publishing

- Run `npm run build`
- Run `npm run pub`
