import { builder } from "../builder"
import { Post } from "@/schema/Post"
import * as Inputs from '@/schema/inputs'
import { db } from "@/db"

const mutations = builder.mutationFields((t) => ({
  createOnePost: t.field({
    type: Post,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.PostCreateInput, required: true }),
    },
    resolve: async (root, args) => {
      const post = await db.post.create({
        data: args.data,
      })

      return post
    }
  })
}))

export default mutations