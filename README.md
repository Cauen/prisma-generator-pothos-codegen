# Prisma Generator Pothos Codegen

A [prisma](https://www.prisma.io/) [generator](https://www.prisma.io/docs/concepts/components/prisma-schema/generators) plugin that auto-generates [Pothos](https://pothos-graphql.dev/) GraphQL input types and crud operations (all queries and mutations).

Easily convert a prisma schema into a full graphql CRUD API.

On `prisma generate` we create:

- All [input types](https://pothos-graphql.dev/docs/guide/inputs) for `Create`, `Find`, `Update`, `Sort` and `Delete` operations (to be used as args in [fields](https://pothos-graphql.dev/docs/guide/fields#arguments)).
- (Optional): Create all `Objects`, `Queries` and `Mutations` base files (to create customizable resolvers).
- (Optional): Execute all these base files without customization to create a default CRUD.

## Table of Contents

- [Getting Started](#getting-started)
  - [Install](#install)
  - [Set Up](#set-up)
  - [Examples](#examples)
- [Usage](#usage)
- [Disclosures](#disclosures)
  - [Tested environments](#tested-environments)
  - [Models with only relations](#models-with-only-relations)
  - [BigInt rename](#bigint-rename)

## Getting Started

### Install

```sh
yarn add prisma-generator-pothos-codegen
```

or using npm

```sh
npm install prisma-generator-pothos-codegen
```

### Peer dependencies

The package was developed and tested using the following peer dependencies:

<!-- TODO Maybe we could have some sort of automated pipeline that tests different versions of these peer deps? -->

```
"@pothos/core": "^3.23.0",
"@pothos/plugin-prisma": "^3.37.0",
"@prisma/client": "^4.7.0",
"graphql": "^16.6.0",
"prisma": "^4.7.0"
```

Using different versions of these dependencies may result in undefined behavior or unintended TypeScript errors.

### Set Up

#### Add the generator to your schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

generator pothos {
  provider = "prisma-pothos-types"
}

generator pothosCrud {
  provider = "prisma-generator-pothos-codegen"
  generatorConfigPath = "./pothos.config.js"
  // You may also set the `generatorConfigPath` via the `POTHOS_CRUD_CONFIG_PATH` environment variable.
  // The environment variable will override the path hardcoded here.
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

#### Create a configuration file (optional)

```js
// ./pothos.config.js

/** @type {import('prisma-generator-pothos-codegen').Config} */
module.exports = {
  inputs: {
    outputFilePath: './src/graphql/__generated__/inputs.ts',
  },
  crud: {
    outputDir: './src/graphql/__generated__/',
    inputsImporter: `export * as Inputs from '@graphql/__generated__/inputs';`,
    resolversImports: `import prisma from '@lib/prisma';`,
    prismaCaller: 'prisma',
  },
  global: {
    builderImporter: `import { builder } from '@graphql/builder';`,
  },
};
```

<details>
  <summary>Click to see all configuration options</summary>
  
  ```ts
  {
    /** Input type generation config */
    inputs?: {
      /** How to import the Prisma namespace. Default: `"import { Prisma } from '.prisma/client';"` */
      prismaImporter?: string;
      /** How to import the Pothos builder. Overrides global builderImporter config. Default: `"import { builder } from './builder';"` */
      builderImporter?: string;
      /** Path to generate the inputs file to from project root. Default: `'./generated/inputs.ts'` */
      outputFilePath?: string;
      /** List of excluded scalars from generated output */
      excludeScalars?: string[];
      /** A function to replace generated source. Combined with global replacer config */
      replacer?: Replacer<'inputs'>;
    };
    /** CRUD generation config */
    crud?: {
      /** Disable generaton of crud. Default: `false` */
      disabled?: boolean;
      /** How to import the Pothos builder. Overrides global builderImporter config. Default: `"import { builder } from './builder';"` */
      builderImporter?: string;
      /** How to import the inputs. Default `"import * as Inputs from '../inputs';"` */
      inputsImporter?: string;
      /** How to import the Prisma namespace. Default `"import { Prisma } from '.prisma/client';"` */
      prismaImporter?: string;
      /** How to call the prisma client. Default `'_context.prisma'` */
      prismaCaller?: string;
      /** Any additional imports you might want to add to the resolvers (e.g. your prisma client). Default `''` */
      resolverImports?: string;
      /** Directory to generate crud code into from project root. Default: `'./generated'` */
      outputDir?: string;
      /** A function to replace generated source. Combined with global replacer config */
      replacer?: Replacer<'crud'>;
      /** A boolean to enable/disable generation of `autocrud.ts` which can be imported in schema root to auto generate all crud objects, queries and mutations. Default: `true` */
      generateAutocrud?: boolean;
      /** An array of parts of resolver names to be excluded from generation. Ie: ["User"] Default: [] */
      excludeResolversContain?: string[];
      /** An array of resolver names to be excluded from generation. Ie: ["upsertOneComment"] Default: [] */
      excludeResolversExact?: string[];
      /** An array of parts of resolver names to be included from generation (to bypass exclude contain). Ie: if exclude ["User"], include ["UserReputation"] Default: [] */
      includeResolversContain?: string[];
      /** An array of resolver names to be included from generation (to bypass exclude contain). Ie: if exclude ["User"], include ["UserReputation"] Default: [] */
      includeResolversExact?: string[];
    };
    /** Global config */
    global?: {
      /** A function to replace generated source */
      replacer?: Replacer;
      /** How to import the Pothos builder. Default: `'import { builder } from "./builder"'` */
      builderImporter?: string;
      /** Run function before generate */
      beforeGenerate?: (dmmf: DMMF.Document) => void;
      /** Run function after generate */
      afterGenerate?: (dmmf: DMMF.Document) => void;
    };
  }
  ```
</details>
<br/>

#### Run the generator

```sh
yarn prisma generate
```

or

```sh
npx prisma generate
```

### Examples

Check for the [example](/examples/inputs-simple-sqlite) for a running sample

![image](https://user-images.githubusercontent.com/8796757/178087266-0a852f43-a7b5-48a0-bc13-a3ece9788457.png)

## Usage

### Inputs

You can use `@Pothos.omit()` function calls in your prisma schema field descriptions to control which fields are used in the generated input types.

- `@Pothos.omit()` Omits the field from all inputs
- `@Pothos.omit(create)` Omits field from the create input
- `@Pothos.omit(orderBy, where, update)` Omits field from the orderBy, where, and update inputs, but not the create input

The available options are `create`, `update`, `where`, and `orderBy`.

```prisma
model User {
  /// @Pothos.omit(create, update)
  id        String   @id @default(uuid())
  email     String
  /// @Pothos.omit()
  password  String
}
```

### Objects

```ts
// ./src/graphql/User/object.ts

import { UserObject } from '@graphql/__generated__/User';
import { builder } from '@graphql/builder'; // pothos schema builder

// Use the Object exports to accept all default generated query code
builder.prismaObject('User', UserObject);

// Or modify it as you wish
builder.prismaObject('User', {
  ...UserObject,
  fields: (t) => {
    // Type-safely omit and rename fields
    const { password: _password, email: emailAddress, ...fields } = UserObject.fields(t);
    const sessionsField = UserSessionsFieldObject(t);

    return {
      ...fields,
      // Renamed field
      emailAddress,
      // Edit and extend field
      sessions: t.relation('sessions', {
        ...sessionsField,
        args: { ...sessionsField.args, customArg: t.arg({ type: 'String', required: false }) },
        authScopes: { admin: true },
      }),
      // Add custom fields
      customField: t.field({ type: 'String', resolve: () => 'Hello world!' }),
    };
  },
});
```

### Queries and Mutations

```ts
// ./src/graphql/User/query.ts

import { findManyUserQuery, findManyUserQueryObject } from '@graphql/__generated__/User';
import { builder } from '@graphql/builder'; // pothos schema builder

// Use the Query exports to accept all default generated query code
builder.queryFields(findManyUserQuery);

// Use the QueryObject exports to override or add to the generated code
builder.queryFields((t) => {
  const field = findManyUserQueryObject(t);
  return {
    findManyUser: t.prismaField({
      // Inherit all the generated properties
      ...field,

      // Modify the args and use custom arg in a custom resolver
      args: { ...field.args, customArg: t.arg({ type: 'String', required: false }) },
      resolve: async (query, root, args, context, info) => {
        const { customArg } = args;
        console.log(customArg);
        return field.resolve(query, root, args, context, info);
      },

      // Add an custom extension
      authScopes: { admin: true },
    }),
  };
});
```

### Auto define all `objects`, `queries` and `mutations` (crud operations)

First, make sure that `options.crud.generateAutocrud` isn't set to `false`

```ts
// ./src/schema/index.ts (import autocrud.ts)
import {
  generateAllCrud,
  generateAllObjects,
  generateAllQueries,
  generateAllMutations
} from '@graphql/__generated__/autocrud.ts',
import { builder } from '@graphql/builder'; // pothos schema builder

// (option 1) generate all objects, queries and mutations
generateAllCrud()

// (option 2) or create them separately
generateAllObjects()
generateAllQueries()
generateAllMutations()

// (option 3) or limit crud generation
generateAllObjects({ include: ["User", "Profile", 'Comment'] })
generateAllQueries({ exclude: ["Comment"] })
generateAllMutations({ exclude: ["User"] })

// defining schema
builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
```

Generated queries:

- count
- findFirst
- findMany
- findUnique

Generated mutations:

- createMany
- createOne
- deleteMany
- deleteOne
- updateMany
- updateOne
- upsertOne

## Disclosures

### Models with only relations

- We create a custom scalar `NEVER` that avoids this error: `Input Object type FollowUpdateManyMutationInput must define one or more fields.` from Graphql. if you have models that are relations-only. Like N-N fields without `no relation fields` or id-only models, we set field `_` of some operations to this scalar. If you fill this fake property, the operation will result in a error.

### BigInt rename

- As `BigInt` is reserved, we export `Bigint` for the BigInt scalar.
