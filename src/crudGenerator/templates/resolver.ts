// TODO ensure resolver params type-safety (query and args are manually typed now)

export const resolverTemplate = `import { Prisma, define#{operationType}, #{define}, Inputs } from '../../imports';
#{imports}#{resolversImports}

export const #{operation}#{modelName}#{operationType}Object = #{define}((t) => ({
  type: #{type},
  nullable: #{nullable},
  args: #{args},
  resolve: #{resolve},
}));

export const #{operation}#{modelName}#{operationType} = define#{operationType}((t) => ({
  #{operation}#{modelName}: t.#{field}(#{operation}#{modelName}#{operationType}Object(t)),
}));
`;

export const queryListArgsTemplate = `{
    where: t.arg({ type: Inputs.#{modelName}WhereInput, required: false }),
    orderBy: t.arg({ type: [Inputs.#{modelName}OrderByWithRelationInput], required: false }),
    cursor: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: false }),
    take: t.arg({ type: 'Int', required: false }),
    skip: t.arg({ type: 'Int', required: false }),
    distinct: t.arg({ type: [Inputs.#{modelName}ScalarFieldEnum], required: false }),
  }`;

export const queryListResolveTemplate = `async (#{argsQuery}_root, args, _context, _info) =>#{error}
    await #{prisma}.#{modelNameLower}.#{operation}({
      where: (args.where as Prisma.#{modelName}WhereInput) || undefined,
      cursor: (args.cursor as Prisma.#{modelName}WhereUniqueInput) || undefined,
      take: (args.take as number) || undefined,
      distinct: (args.distinct as Prisma.Enumerable<Prisma.#{modelName}ScalarFieldEnum>) || undefined,
      skip: (args.skip as number) || undefined,
      orderBy: (args.orderBy as Prisma.#{modelName}OrderByWithRelationInput[]) || undefined,#{query}
    })`;

export const queryListResolveQueryTemplate = `\n      ...(query as { include?: Prisma.#{modelName}Include | undefined }),`;

export const querySingleArgsTemplate = `{
    where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
  }`;

export const querySingleResolveTemplate = `async (query, _root, args, _context, _info) =>
    await #{prisma}.#{modelNameLower}.findUnique({
      where: args.where as Prisma.#{modelName}WhereUniqueInput,
      ...(query as { include?: Prisma.#{modelName}Include | undefined }),
    })`;

export const mutationCreateManyResolverTemplate = `async (_query, _root, args, _context, _info) =>
    await #{prisma}.$transaction(
      (args.data as Prisma.#{modelName}CreateInput[]).map((data) => {
        return #{prisma}.#{modelNameLower}.create({ data });
      }),
    )`;

export const mutationCreateResolverTemplate = `async (query, _root, args, _context, _info) =>
    await #{prisma}.#{modelNameLower}.create({
      data: args.data as Prisma.#{modelName}CreateInput,
      ...(query as { include: Prisma.#{modelName}Include }),
    })`;

export const mutationDeleteManyResolverTemplate = `async (_root, args, _context, _info) =>
    // @ts-expect-error // TODO fix this typing bug
    await #{prisma}.#{modelNameLower}.deleteMany({ where: args.where as Prisma.#{modelName}WhereInput })`;

export const mutationDeleteOneResolverTemplate = `async (query, _root, args, context) =>
    await #{prisma}.#{modelNameLower}.delete({
      where: args.where as Prisma.#{modelName}WhereUniqueInput,
      ...(query as { include: Prisma.#{modelName}Include }),
    })`;

export const mutationUpdateManyArgsTemplate = `{
    where: t.arg({ type: Inputs.#{modelName}WhereInput, required: false }),
    data: t.arg({ type: Inputs.#{modelName}UpdateManyMutationInput, required: true }),
  }`;

export const mutationUpdateManyResolverTemplate = `async (_root, args, _context, _info) =>
    // @ts-expect-error // TODO fix this typing bug
    await #{prisma}.#{modelNameLower}.updateMany({
      where: (args.where as Prisma.#{modelName}WhereInput) || undefined,
      data: args.data as Prisma.#{modelName}UpdateManyMutationInput,
    })`;

export const mutationUpdateOneArgsTemplate = `{
    where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
    data: t.arg({ type: Inputs.#{modelName}UpdateInput, required: true }),
  }`;

export const mutationUpdateOneResolverTemplate = `async (query, _root, args, _context, _info) =>
    await #{prisma}.#{modelNameLower}.update({
      where: args.where as Prisma.#{modelName}WhereUniqueInput,
      data: args.data as Prisma.#{modelName}UpdateInput,
      ...(query as { include: Prisma.#{modelName}Include }),
    })`;

export const mutationUpsertOneArgsTemplate = `{
    where: t.arg({ type: Inputs.#{modelName}WhereUniqueInput, required: true }),
    create: t.arg({ type: Inputs.#{modelName}CreateInput, required: true }),
    update: t.arg({ type: Inputs.#{modelName}UpdateInput, required: true }),
  }`;

export const mutationUpsertOneResolverTemplate = `async (query, _root, args, _context, _info) =>
    await #{prisma}.#{modelNameLower}.upsert({
      where: args.where as Prisma.#{modelName}WhereUniqueInput,
      create: args.create as Prisma.#{modelName}CreateInput,
      update: args.update as Prisma.#{modelName}UpdateInput,
      ...(query as { include: Prisma.#{modelName}Include }),
    })`;
