# Prisma Generator Pothos Codegen
This is a prisma generator that auto generate all input types for Crud Operations to Pothos. Use it as args for crud operations.

## Usage

```
generator client {
  provider = "prisma-client-js"
}

generator nexusPrisma {
   provider = "prisma-generator-pothos-codegen"
}

/// This is a user!
model User {
  /// This is an id!
  id  String  @id
}
```
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

The generator currently supports a few options

|          Key          |              Default Value              |                                              Description                                             |
|:---------------------:|:---------------------------------------:|:----------------------------------------------------------------------------------------------------:|
| inputsPrismaImporter  | import { Prisma } from ".prisma/client" | When the file was generated, its needed to import Prisma. Here we can set from where to import.      |
| inputsBuilderImporter | import { builder } from "./builder"     | When the file was generated, its needed to import the builder. Here we can set from where to import. |
| output                | /generated/inputs.ts                    | Where the inputs are generated                                                                       |

# Disclosures
## Models with only relations
- We create a custom scalar `NEVER` that avoids this error: `Input Object type FollowUpdateManyMutationInput must define one or more fields.` from Graphql. if you have models that are relations-only. Like N-N fields without `no relation fields` or id-only models, we set field `_` of some operations to this scalar. If you fill this fake property, the operation will result in a error.

## BigInt rename
- As `BigInt` is reserved, we export `Bigint` for the BigInt scalar.