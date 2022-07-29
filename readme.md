# Prisma Generator Pothos Codegen
This is a prisma generator that auto generate all input types for Crud Operations to Pothos. Use it as args for crud operations.

And generate all `crud` operations automatically.
Optionally you can disable crud generation inside configs file.
Just set: `configs.crud.disabled` to `true`

**The roadmap:**

- [x] Generator code for all input fields.
- [x] Generator for all `Objects`, `Queries` and `Mutations`. Something like `prisma-tools` do with Prisma and Nexus.
- [] Anottations to improve generation
  - [] Exclude fields from input/object generation [#4](https://github.com/Cauen/prisma-generator-pothos-codegen/issues/4)

## Getting Started

### Install

`yarn add prisma-generator-pothos-codegen` or `npm install prisma-generator-pothos-codegen`

### Usage

#### Add generator

```
generator client {
  provider = "prisma-client-js"
}

generator nexusPrisma {
   provider = "prisma-generator-pothos-codegen"
   generatorConfigPath = "../src/schema/configs.ts"
}

/// This is a user!
model User {
  /// This is an id!
  id  String  @id
}
```

#### Add scalar types to builder

```ts
import { Scalars } from 'prisma-generator-pothos-codegen'
import { Prisma } from '.prisma/client'

export const builder = new SchemaBuilder<{
  Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>,
}>({
  ...
});
```

#### Import inputs from the generated file, and add as args.

```ts
import * as Inputs from './generated/inputs'

builder.queryFields((t) => ({
  findManyUser: t.field({
    type: [User],
    args: {
      where: t.arg({ type: Inputs.UserWhereInput }),
      orderBy: t.arg({ type: [Inputs.UserOrderByWithRelationInput] }),
      cursor: t.arg({ type: Inputs.UserWhereUniqueInput }),
      take: t.arg({ type: 'Int' }),
      skip: t.arg({ type: 'Int' }),
      distinct: t.arg({ type: [Inputs.UserScalarFieldEnum] }),
    },
    resolve: async (root, args) => {
      const user = await db.user.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })

      return user
    }
  }),
}))

```

The generator currently supports a few options:

|          Key          |              Default Value              |                                              Description                                             |
|:----------------------|:----------------------------------------|:-----------------------------------------------------------------------------------------------------|
| generatorConfigPath  | ../src/schema/configs.ts | Path to the configs file, from the schema path.      |

<details>
  <summary>Click to see configs options</summary>
  
  ```ts
  {
    inputs?: {
      prismaImporter?: string // default: import { Prisma } from ".prisma/client"
      builderImporter?: string // default: import { builder } from "./builder"
      excludeInputs?: string[] // default: undefined
      excludeScalars?: string[] // default: undefined
      outputFilePath?: string // path to generate file, from project root
      replacer?: (generated: string, position: ReplacerPosition) => string // a function to replace generated source
    },
    crud?: {
      disabled?: boolean // disable generaton of crud. default: false
      includeResolversExact?: string[] // generate only resolvers with name in the list. default: undefined. ie: ['createOneUser']
      includeResolversContain?: string[] // generate only resolvers with name included in the list. default: undefined. ie: ['User'].
      excludeResolversExact?: string[] // default: undefined. ie: ['createOneComment']
      excludeResolversContain?: string[] // default: undefined. ie: ['createOne']
      resolversImports?: string // default: what to import inside resolver
      dbCaller?: string // how to call prisma. default: context.db
      inputsImporter?: string // default: import * as Inputs from "@/generated/inputs";
      builderImporter?: string // default: import { builder } from "./builder"
      outputFolderPath?: string // path to generate files, from project root. default: ./generated
      replacer?: (generated: string, position: ReplacerPosition) => string // a function to replace generated source
    },
    global?: {
      replacer?: (generated: string, position: ReplacerPosition) => string // a function to replace generated source
    }
  }
  ```

  See example: [click here](/examples/inputs-simple-sqlite/src/schema/configs.ts)
</details>

<br />

### The tested environments:
| **Prisma Version** | **Database**      | **State** |
|--------------------|-------------------|-----------|
| 3.12 - 4.00        | Postgres - Sqlite | ✅        |


### Example
Check for the [example](/examples/inputs-simple-sqlite) for a running sample
![image](https://user-images.githubusercontent.com/8796757/178087266-0a852f43-a7b5-48a0-bc13-a3ece9788457.png)

# Disclosures
## Models with only relations
- We create a custom scalar `NEVER` that avoids this error: `Input Object type FollowUpdateManyMutationInput must define one or more fields.` from Graphql. if you have models that are relations-only. Like N-N fields without `no relation fields` or id-only models, we set field `_` of some operations to this scalar. If you fill this fake property, the operation will result in a error.

## BigInt rename
- As `BigInt` is reserved, we export `Bigint` for the BigInt scalar.

# Publishing

- Run `npm run build`
- Run `npm run pub`