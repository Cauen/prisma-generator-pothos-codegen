// @ts-nocheck
import { Prisma } from '.prisma/client';
import { builder } from './builder';

export const DateTime = builder.scalarType('DateTime', {
  parseValue: (value) => {
    const isDateParsable = typeof value === 'string' || typeof value === 'number';
    if (!isDateParsable) throw new Error('Invalid Date type');
    const date = new Date(value);
    const isInvalidDate = date.toString() === 'Invalid Date';
    if (isInvalidDate) throw new Error('Invalid Date');
    return new Date(value);
  },
  serialize: (value) => value ? new Date(value) : null,
});

export const Decimal = builder.scalarType('Decimal', {
  serialize: (value) => value,
  parseValue: (value) => {
    if (typeof value !== 'number' && typeof value !== 'string') throw new Error('Invalid Decimal');
    return new Prisma.Decimal(value);
  },
});

export const Bytes = builder.scalarType('Bytes', {
  serialize: (value) => value,
  parseValue: (value) => {
    if (Array.isArray(value)) return Buffer.from(value);
    if (typeof value === 'string') return Buffer.from(value, 'utf8');
    throw new Error('Bytes must be string or array');
  },
});

export const Bigint = builder.scalarType('BigInt', {
  serialize: (value) => value.toString(),
  parseValue: (value) => {
    if (typeof value !== 'string' && typeof value !== 'number') throw new Error('Invalid Bigint');
    return BigInt(value);
  },
});

export const NEVER = builder.scalarType('NEVER', {
  serialize: (value) => value,
  description: 'Never fill this, its created for inputs that dont have fields',
});

export const UserScalarFieldEnum = builder.enumType('UserScalarFieldEnum', {
  values: ["id","firstName","lastName","birthdate","login","password","createdAt","updatedAt"] as const,
});

export const PostScalarFieldEnum = builder.enumType('PostScalarFieldEnum', {
  values: ["id","title","content","authorId"] as const,
});

export const ExtraModalScalarFieldEnum = builder.enumType('ExtraModalScalarFieldEnum', {
  values: ["id","title","createdAt","updatedAt"] as const,
});

export const CommentScalarFieldEnum = builder.enumType('CommentScalarFieldEnum', {
  values: ["id","comment","authorId","postId"] as const,
});

export const ProfileScalarFieldEnum = builder.enumType('ProfileScalarFieldEnum', {
  values: ["id","bio","userId"] as const,
});

export const FollowScalarFieldEnum = builder.enumType('FollowScalarFieldEnum', {
  values: ["fromId","toId"] as const,
});

export const UnrelatedScalarFieldEnum = builder.enumType('UnrelatedScalarFieldEnum', {
  values: ["id","name"] as const,
});

export const IdOnlyScalarFieldEnum = builder.enumType('IdOnlyScalarFieldEnum', {
  values: ["id"] as const,
});

export const WithoutIDScalarFieldEnum = builder.enumType('WithoutIDScalarFieldEnum', {
  values: ["name"] as const,
});

export const WithScalarsScalarFieldEnum = builder.enumType('WithScalarsScalarFieldEnum', {
  values: ["id","string","boolean","int","float","decimal","bigint","datetime","bytes"] as const,
});

export const SortOrder = builder.enumType('SortOrder', {
  values: ["asc","desc"] as const,
});

export const UserWhereInput = builder.inputRef<Prisma.UserWhereInput>('UserWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[UserWhereInput]}),
    OR: t.field({"required":false,"type":[UserWhereInput]}),
    NOT: t.field({"required":false,"type":[UserWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    firstName: t.field({"required":false,"type":StringFilter}),
    lastName: t.field({"required":false,"type":StringFilter}),
    birthdate: t.field({"required":false,"type":DateTimeFilter}),
    login: t.field({"required":false,"type":StringFilter}),
    Posts: t.field({"required":false,"type":PostListRelationFilter}),
    Comments: t.field({"required":false,"type":CommentListRelationFilter}),
    createdAt: t.field({"required":false,"type":DateTimeFilter}),
    updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
    Profile: t.field({"required":false,"type":ProfileListRelationFilter}),
    Followers: t.field({"required":false,"type":FollowListRelationFilter}),
    Following: t.field({"required":false,"type":FollowListRelationFilter}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserOrderByWithRelationInput = builder.inputRef<Prisma.UserOrderByWithRelationInput>('UserOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    firstName: t.field({"required":false,"type":SortOrder}),
    lastName: t.field({"required":false,"type":SortOrder}),
    birthdate: t.field({"required":false,"type":SortOrder}),
    login: t.field({"required":false,"type":SortOrder}),
    Posts: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
    Comments: t.field({"required":false,"type":CommentOrderByRelationAggregateInput}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
    Profile: t.field({"required":false,"type":ProfileOrderByRelationAggregateInput}),
    Followers: t.field({"required":false,"type":FollowOrderByRelationAggregateInput}),
    Following: t.field({"required":false,"type":FollowOrderByRelationAggregateInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserWhereUniqueInput = builder.inputRef<Prisma.UserWhereUniqueInput>('UserWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const UserOrderByWithAggregationInput = builder.inputRef<Prisma.UserOrderByWithAggregationInput>('UserOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    firstName: t.field({"required":false,"type":SortOrder}),
    lastName: t.field({"required":false,"type":SortOrder}),
    birthdate: t.field({"required":false,"type":SortOrder}),
    login: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":UserCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":UserAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":UserMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":UserMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":UserSumOrderByAggregateInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserScalarWhereWithAggregatesInput = builder.inputRef<Prisma.UserScalarWhereWithAggregatesInput>('UserScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    firstName: t.field({"required":false,"type":StringWithAggregatesFilter}),
    lastName: t.field({"required":false,"type":StringWithAggregatesFilter}),
    birthdate: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
    login: t.field({"required":false,"type":StringWithAggregatesFilter}),
    createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
    updatedAt: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const PostWhereInput = builder.inputRef<Prisma.PostWhereInput>('PostWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[PostWhereInput]}),
    OR: t.field({"required":false,"type":[PostWhereInput]}),
    NOT: t.field({"required":false,"type":[PostWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    title: t.field({"required":false,"type":StringFilter}),
    content: t.field({"required":false,"type":StringFilter}),
    Author: t.field({"required":false,"type":UserWhereInput}),
    Comments: t.field({"required":false,"type":CommentListRelationFilter}),
    authorId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const PostOrderByWithRelationInput = builder.inputRef<Prisma.PostOrderByWithRelationInput>('PostOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    content: t.field({"required":false,"type":SortOrder}),
    Author: t.field({"required":false,"type":UserOrderByWithRelationInput}),
    Comments: t.field({"required":false,"type":CommentOrderByRelationAggregateInput}),
    authorId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const PostWhereUniqueInput = builder.inputRef<Prisma.PostWhereUniqueInput>('PostWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const PostOrderByWithAggregationInput = builder.inputRef<Prisma.PostOrderByWithAggregationInput>('PostOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    content: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":PostCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":PostAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":PostMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":PostMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":PostSumOrderByAggregateInput}),
  }),
});

export const PostScalarWhereWithAggregatesInput = builder.inputRef<Prisma.PostScalarWhereWithAggregatesInput>('PostScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    title: t.field({"required":false,"type":StringWithAggregatesFilter}),
    content: t.field({"required":false,"type":StringWithAggregatesFilter}),
    authorId: t.field({"required":false,"type":IntWithAggregatesFilter}),
  }),
});

export const ExtraModalWhereInput = builder.inputRef<Prisma.ExtraModalWhereInput>('ExtraModalWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[ExtraModalWhereInput]}),
    OR: t.field({"required":false,"type":[ExtraModalWhereInput]}),
    NOT: t.field({"required":false,"type":[ExtraModalWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    title: t.field({"required":false,"type":StringFilter}),
    createdAt: t.field({"required":false,"type":DateTimeFilter}),
    updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  }),
});

export const ExtraModalOrderByWithRelationInput = builder.inputRef<Prisma.ExtraModalOrderByWithRelationInput>('ExtraModalOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ExtraModalWhereUniqueInput = builder.inputRef<Prisma.ExtraModalWhereUniqueInput>('ExtraModalWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const ExtraModalOrderByWithAggregationInput = builder.inputRef<Prisma.ExtraModalOrderByWithAggregationInput>('ExtraModalOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":ExtraModalCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":ExtraModalAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":ExtraModalMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":ExtraModalMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":ExtraModalSumOrderByAggregateInput}),
  }),
});

export const ExtraModalScalarWhereWithAggregatesInput = builder.inputRef<Prisma.ExtraModalScalarWhereWithAggregatesInput>('ExtraModalScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[ExtraModalScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[ExtraModalScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[ExtraModalScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    title: t.field({"required":false,"type":StringWithAggregatesFilter}),
    createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
    updatedAt: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
  }),
});

export const CommentWhereInput = builder.inputRef<Prisma.CommentWhereInput>('CommentWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[CommentWhereInput]}),
    OR: t.field({"required":false,"type":[CommentWhereInput]}),
    NOT: t.field({"required":false,"type":[CommentWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    comment: t.field({"required":false,"type":StringFilter}),
    Author: t.field({"required":false,"type":UserWhereInput}),
    Post: t.field({"required":false,"type":PostWhereInput}),
    authorId: t.field({"required":false,"type":IntFilter}),
    postId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const CommentOrderByWithRelationInput = builder.inputRef<Prisma.CommentOrderByWithRelationInput>('CommentOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    comment: t.field({"required":false,"type":SortOrder}),
    Author: t.field({"required":false,"type":UserOrderByWithRelationInput}),
    Post: t.field({"required":false,"type":PostOrderByWithRelationInput}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const CommentWhereUniqueInput = builder.inputRef<Prisma.CommentWhereUniqueInput>('CommentWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const CommentOrderByWithAggregationInput = builder.inputRef<Prisma.CommentOrderByWithAggregationInput>('CommentOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    comment: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":CommentCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":CommentAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":CommentMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":CommentMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":CommentSumOrderByAggregateInput}),
  }),
});

export const CommentScalarWhereWithAggregatesInput = builder.inputRef<Prisma.CommentScalarWhereWithAggregatesInput>('CommentScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[CommentScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[CommentScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[CommentScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    comment: t.field({"required":false,"type":StringWithAggregatesFilter}),
    authorId: t.field({"required":false,"type":IntWithAggregatesFilter}),
    postId: t.field({"required":false,"type":IntWithAggregatesFilter}),
  }),
});

export const ProfileWhereInput = builder.inputRef<Prisma.ProfileWhereInput>('ProfileWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[ProfileWhereInput]}),
    OR: t.field({"required":false,"type":[ProfileWhereInput]}),
    NOT: t.field({"required":false,"type":[ProfileWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    bio: t.field({"required":false,"type":StringNullableFilter}),
    User: t.field({"required":false,"type":UserWhereInput}),
    userId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const ProfileOrderByWithRelationInput = builder.inputRef<Prisma.ProfileOrderByWithRelationInput>('ProfileOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    bio: t.field({"required":false,"type":SortOrder}),
    User: t.field({"required":false,"type":UserOrderByWithRelationInput}),
    userId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ProfileWhereUniqueInput = builder.inputRef<Prisma.ProfileWhereUniqueInput>('ProfileWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
    userId: t.int({"required":false}),
  }),
});

export const ProfileOrderByWithAggregationInput = builder.inputRef<Prisma.ProfileOrderByWithAggregationInput>('ProfileOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    bio: t.field({"required":false,"type":SortOrder}),
    userId: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":ProfileCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":ProfileAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":ProfileMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":ProfileMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":ProfileSumOrderByAggregateInput}),
  }),
});

export const ProfileScalarWhereWithAggregatesInput = builder.inputRef<Prisma.ProfileScalarWhereWithAggregatesInput>('ProfileScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[ProfileScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[ProfileScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[ProfileScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    bio: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
    userId: t.field({"required":false,"type":IntWithAggregatesFilter}),
  }),
});

export const FollowWhereInput = builder.inputRef<Prisma.FollowWhereInput>('FollowWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[FollowWhereInput]}),
    OR: t.field({"required":false,"type":[FollowWhereInput]}),
    NOT: t.field({"required":false,"type":[FollowWhereInput]}),
    fromId: t.field({"required":false,"type":IntFilter}),
    toId: t.field({"required":false,"type":IntFilter}),
    From: t.field({"required":false,"type":UserWhereInput}),
    To: t.field({"required":false,"type":UserWhereInput}),
  }),
});

export const FollowOrderByWithRelationInput = builder.inputRef<Prisma.FollowOrderByWithRelationInput>('FollowOrderByWithRelationInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
    From: t.field({"required":false,"type":UserOrderByWithRelationInput}),
    To: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  }),
});

export const FollowWhereUniqueInput = builder.inputRef<Prisma.FollowWhereUniqueInput>('FollowWhereUniqueInput').implement({
  fields: (t) => ({
    compositeID: t.field({"required":false,"type":FollowCompositeIDCompoundUniqueInput}),
  }),
});

export const FollowOrderByWithAggregationInput = builder.inputRef<Prisma.FollowOrderByWithAggregationInput>('FollowOrderByWithAggregationInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":FollowCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":FollowAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":FollowMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":FollowMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":FollowSumOrderByAggregateInput}),
  }),
});

export const FollowScalarWhereWithAggregatesInput = builder.inputRef<Prisma.FollowScalarWhereWithAggregatesInput>('FollowScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[FollowScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[FollowScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[FollowScalarWhereWithAggregatesInput]}),
    fromId: t.field({"required":false,"type":IntWithAggregatesFilter}),
    toId: t.field({"required":false,"type":IntWithAggregatesFilter}),
  }),
});

export const UnrelatedWhereInput = builder.inputRef<Prisma.UnrelatedWhereInput>('UnrelatedWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[UnrelatedWhereInput]}),
    OR: t.field({"required":false,"type":[UnrelatedWhereInput]}),
    NOT: t.field({"required":false,"type":[UnrelatedWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    name: t.field({"required":false,"type":StringNullableFilter}),
  }),
});

export const UnrelatedOrderByWithRelationInput = builder.inputRef<Prisma.UnrelatedOrderByWithRelationInput>('UnrelatedOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UnrelatedWhereUniqueInput = builder.inputRef<Prisma.UnrelatedWhereUniqueInput>('UnrelatedWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const UnrelatedOrderByWithAggregationInput = builder.inputRef<Prisma.UnrelatedOrderByWithAggregationInput>('UnrelatedOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    name: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":UnrelatedCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":UnrelatedAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":UnrelatedMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":UnrelatedMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":UnrelatedSumOrderByAggregateInput}),
  }),
});

export const UnrelatedScalarWhereWithAggregatesInput = builder.inputRef<Prisma.UnrelatedScalarWhereWithAggregatesInput>('UnrelatedScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[UnrelatedScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[UnrelatedScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[UnrelatedScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    name: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  }),
});

export const IdOnlyWhereInput = builder.inputRef<Prisma.IdOnlyWhereInput>('IdOnlyWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[IdOnlyWhereInput]}),
    OR: t.field({"required":false,"type":[IdOnlyWhereInput]}),
    NOT: t.field({"required":false,"type":[IdOnlyWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
  }),
});

export const IdOnlyOrderByWithRelationInput = builder.inputRef<Prisma.IdOnlyOrderByWithRelationInput>('IdOnlyOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IdOnlyWhereUniqueInput = builder.inputRef<Prisma.IdOnlyWhereUniqueInput>('IdOnlyWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const IdOnlyOrderByWithAggregationInput = builder.inputRef<Prisma.IdOnlyOrderByWithAggregationInput>('IdOnlyOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":IdOnlyCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":IdOnlyAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":IdOnlyMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":IdOnlyMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":IdOnlySumOrderByAggregateInput}),
  }),
});

export const IdOnlyScalarWhereWithAggregatesInput = builder.inputRef<Prisma.IdOnlyScalarWhereWithAggregatesInput>('IdOnlyScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[IdOnlyScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[IdOnlyScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[IdOnlyScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  }),
});

export const WithoutIDWhereInput = builder.inputRef<Prisma.WithoutIDWhereInput>('WithoutIDWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[WithoutIDWhereInput]}),
    OR: t.field({"required":false,"type":[WithoutIDWhereInput]}),
    NOT: t.field({"required":false,"type":[WithoutIDWhereInput]}),
    name: t.field({"required":false,"type":StringFilter}),
  }),
});

export const WithoutIDOrderByWithRelationInput = builder.inputRef<Prisma.WithoutIDOrderByWithRelationInput>('WithoutIDOrderByWithRelationInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithoutIDWhereUniqueInput = builder.inputRef<Prisma.WithoutIDWhereUniqueInput>('WithoutIDWhereUniqueInput').implement({
  fields: (t) => ({
    name: t.string({"required":false}),
  }),
});

export const WithoutIDOrderByWithAggregationInput = builder.inputRef<Prisma.WithoutIDOrderByWithAggregationInput>('WithoutIDOrderByWithAggregationInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":WithoutIDCountOrderByAggregateInput}),
    _max: t.field({"required":false,"type":WithoutIDMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":WithoutIDMinOrderByAggregateInput}),
  }),
});

export const WithoutIDScalarWhereWithAggregatesInput = builder.inputRef<Prisma.WithoutIDScalarWhereWithAggregatesInput>('WithoutIDScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[WithoutIDScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[WithoutIDScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[WithoutIDScalarWhereWithAggregatesInput]}),
    name: t.field({"required":false,"type":StringWithAggregatesFilter}),
  }),
});

export const WithScalarsWhereInput = builder.inputRef<Prisma.WithScalarsWhereInput>('WithScalarsWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[WithScalarsWhereInput]}),
    OR: t.field({"required":false,"type":[WithScalarsWhereInput]}),
    NOT: t.field({"required":false,"type":[WithScalarsWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    string: t.field({"required":false,"type":StringNullableFilter}),
    boolean: t.field({"required":false,"type":BoolNullableFilter}),
    int: t.field({"required":false,"type":IntNullableFilter}),
    float: t.field({"required":false,"type":FloatNullableFilter}),
    decimal: t.field({"required":false,"type":DecimalNullableFilter}),
    bigint: t.field({"required":false,"type":BigIntNullableFilter}),
    datetime: t.field({"required":false,"type":DateTimeNullableFilter}),
    bytes: t.field({"required":false,"type":BytesNullableFilter}),
  }),
});

export const WithScalarsOrderByWithRelationInput = builder.inputRef<Prisma.WithScalarsOrderByWithRelationInput>('WithScalarsOrderByWithRelationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    string: t.field({"required":false,"type":SortOrder}),
    boolean: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
    datetime: t.field({"required":false,"type":SortOrder}),
    bytes: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithScalarsWhereUniqueInput = builder.inputRef<Prisma.WithScalarsWhereUniqueInput>('WithScalarsWhereUniqueInput').implement({
  fields: (t) => ({
    id: t.int({"required":false}),
  }),
});

export const WithScalarsOrderByWithAggregationInput = builder.inputRef<Prisma.WithScalarsOrderByWithAggregationInput>('WithScalarsOrderByWithAggregationInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    string: t.field({"required":false,"type":SortOrder}),
    boolean: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
    datetime: t.field({"required":false,"type":SortOrder}),
    bytes: t.field({"required":false,"type":SortOrder}),
    _count: t.field({"required":false,"type":WithScalarsCountOrderByAggregateInput}),
    _avg: t.field({"required":false,"type":WithScalarsAvgOrderByAggregateInput}),
    _max: t.field({"required":false,"type":WithScalarsMaxOrderByAggregateInput}),
    _min: t.field({"required":false,"type":WithScalarsMinOrderByAggregateInput}),
    _sum: t.field({"required":false,"type":WithScalarsSumOrderByAggregateInput}),
  }),
});

export const WithScalarsScalarWhereWithAggregatesInput = builder.inputRef<Prisma.WithScalarsScalarWhereWithAggregatesInput>('WithScalarsScalarWhereWithAggregatesInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[WithScalarsScalarWhereWithAggregatesInput]}),
    OR: t.field({"required":false,"type":[WithScalarsScalarWhereWithAggregatesInput]}),
    NOT: t.field({"required":false,"type":[WithScalarsScalarWhereWithAggregatesInput]}),
    id: t.field({"required":false,"type":IntWithAggregatesFilter}),
    string: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
    boolean: t.field({"required":false,"type":BoolNullableWithAggregatesFilter}),
    int: t.field({"required":false,"type":IntNullableWithAggregatesFilter}),
    float: t.field({"required":false,"type":FloatNullableWithAggregatesFilter}),
    decimal: t.field({"required":false,"type":DecimalNullableWithAggregatesFilter}),
    bigint: t.field({"required":false,"type":BigIntNullableWithAggregatesFilter}),
    datetime: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
    bytes: t.field({"required":false,"type":BytesNullableWithAggregatesFilter}),
  }),
});

export const UserCreateInput = builder.inputRef<Prisma.UserCreateInput>('UserCreateInput').implement({
  fields: (t) => ({
    firstName: t.string({"required":true}),
    lastName: t.string({"required":true}),
    birthdate: t.field({"required":true,"type":DateTime}),
    login: t.string({"required":true}),
    Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
    Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
    Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
    Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserUpdateInput = builder.inputRef<Prisma.UserUpdateInput>('UserUpdateInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
    Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
    Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
    Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserUpdateManyMutationInput = builder.inputRef<Prisma.UserUpdateManyMutationInput>('UserUpdateManyMutationInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const PostCreateInput = builder.inputRef<Prisma.PostCreateInput>('PostCreateInput').implement({
  fields: (t) => ({
    title: t.string({"required":true}),
    content: t.string({"required":true}),
    Author: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutPostInput}),
  }),
});

export const PostUpdateInput = builder.inputRef<Prisma.PostUpdateInput>('PostUpdateInput').implement({
  fields: (t) => ({
    title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutPostNestedInput}),
  }),
});

export const PostUpdateManyMutationInput = builder.inputRef<Prisma.PostUpdateManyMutationInput>('PostUpdateManyMutationInput').implement({
  fields: (t) => ({
    title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  }),
});

export const ExtraModalCreateInput = builder.inputRef<Prisma.ExtraModalCreateInput>('ExtraModalCreateInput').implement({
  fields: (t) => ({
    title: t.string({"required":true}),
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const ExtraModalUpdateInput = builder.inputRef<Prisma.ExtraModalUpdateInput>('ExtraModalUpdateInput').implement({
  fields: (t) => ({
    title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const ExtraModalUpdateManyMutationInput = builder.inputRef<Prisma.ExtraModalUpdateManyMutationInput>('ExtraModalUpdateManyMutationInput').implement({
  fields: (t) => ({
    title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const CommentCreateInput = builder.inputRef<Prisma.CommentCreateInput>('CommentCreateInput').implement({
  fields: (t) => ({
    comment: t.string({"required":true}),
    Author: t.field({"required":true,"type":UserCreateNestedOneWithoutCommentsInput}),
    Post: t.field({"required":true,"type":PostCreateNestedOneWithoutCommentsInput}),
  }),
});

export const CommentUpdateInput = builder.inputRef<Prisma.CommentUpdateInput>('CommentUpdateInput').implement({
  fields: (t) => ({
    comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutCommentsNestedInput}),
    Post: t.field({"required":false,"type":PostUpdateOneRequiredWithoutCommentsNestedInput}),
  }),
});

export const CommentUpdateManyMutationInput = builder.inputRef<Prisma.CommentUpdateManyMutationInput>('CommentUpdateManyMutationInput').implement({
  fields: (t) => ({
    comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  }),
});

export const ProfileCreateInput = builder.inputRef<Prisma.ProfileCreateInput>('ProfileCreateInput').implement({
  fields: (t) => ({
    bio: t.string({"required":false}),
    User: t.field({"required":true,"type":UserCreateNestedOneWithoutProfileInput}),
  }),
});

export const ProfileUpdateInput = builder.inputRef<Prisma.ProfileUpdateInput>('ProfileUpdateInput').implement({
  fields: (t) => ({
    bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
    User: t.field({"required":false,"type":UserUpdateOneRequiredWithoutProfileNestedInput}),
  }),
});

export const ProfileUpdateManyMutationInput = builder.inputRef<Prisma.ProfileUpdateManyMutationInput>('ProfileUpdateManyMutationInput').implement({
  fields: (t) => ({
    bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  }),
});

export const FollowCreateInput = builder.inputRef<Prisma.FollowCreateInput>('FollowCreateInput').implement({
  fields: (t) => ({
    From: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowingInput}),
    To: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowersInput}),
  }),
});

export const FollowUpdateInput = builder.inputRef<Prisma.FollowUpdateInput>('FollowUpdateInput').implement({
  fields: (t) => ({
    From: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowingNestedInput}),
    To: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowersNestedInput}),
  }),
});

export const FollowUpdateManyMutationInput = builder.inputRef<Prisma.FollowUpdateManyMutationInput>('FollowUpdateManyMutationInput').implement({
  fields: (t) => ({
    _: t.field({ type: NEVER }),
  }),
});

export const UnrelatedCreateInput = builder.inputRef<Prisma.UnrelatedCreateInput>('UnrelatedCreateInput').implement({
  fields: (t) => ({
    name: t.string({"required":false}),
  }),
});

export const UnrelatedUpdateInput = builder.inputRef<Prisma.UnrelatedUpdateInput>('UnrelatedUpdateInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  }),
});

export const UnrelatedUpdateManyMutationInput = builder.inputRef<Prisma.UnrelatedUpdateManyMutationInput>('UnrelatedUpdateManyMutationInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  }),
});

export const IdOnlyCreateInput = builder.inputRef<Prisma.IdOnlyCreateInput>('IdOnlyCreateInput').implement({
  fields: (t) => ({
    _: t.field({ type: NEVER }),
  }),
});

export const IdOnlyUpdateInput = builder.inputRef<Prisma.IdOnlyUpdateInput>('IdOnlyUpdateInput').implement({
  fields: (t) => ({
    _: t.field({ type: NEVER }),
  }),
});

export const IdOnlyUpdateManyMutationInput = builder.inputRef<Prisma.IdOnlyUpdateManyMutationInput>('IdOnlyUpdateManyMutationInput').implement({
  fields: (t) => ({
    _: t.field({ type: NEVER }),
  }),
});

export const WithoutIDCreateInput = builder.inputRef<Prisma.WithoutIDCreateInput>('WithoutIDCreateInput').implement({
  fields: (t) => ({
    name: t.string({"required":true}),
  }),
});

export const WithoutIDUpdateInput = builder.inputRef<Prisma.WithoutIDUpdateInput>('WithoutIDUpdateInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  }),
});

export const WithoutIDUpdateManyMutationInput = builder.inputRef<Prisma.WithoutIDUpdateManyMutationInput>('WithoutIDUpdateManyMutationInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  }),
});

export const WithScalarsCreateInput = builder.inputRef<Prisma.WithScalarsCreateInput>('WithScalarsCreateInput').implement({
  fields: (t) => ({
    string: t.string({"required":false}),
    boolean: t.boolean({"required":false}),
    int: t.int({"required":false}),
    float: t.float({"required":false}),
    decimal: t.field({"required":false,"type":Decimal}),
    bigint: t.field({"required":false,"type":Bigint}),
    datetime: t.field({"required":false,"type":DateTime}),
    bytes: t.field({"required":false,"type":Bytes}),
  }),
});

export const WithScalarsUpdateInput = builder.inputRef<Prisma.WithScalarsUpdateInput>('WithScalarsUpdateInput').implement({
  fields: (t) => ({
    string: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
    boolean: t.field({"required":false,"type":NullableBoolFieldUpdateOperationsInput}),
    int: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
    float: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
    decimal: t.field({"required":false,"type":NullableDecimalFieldUpdateOperationsInput}),
    bigint: t.field({"required":false,"type":NullableBigIntFieldUpdateOperationsInput}),
    datetime: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
    bytes: t.field({"required":false,"type":NullableBytesFieldUpdateOperationsInput}),
  }),
});

export const WithScalarsUpdateManyMutationInput = builder.inputRef<Prisma.WithScalarsUpdateManyMutationInput>('WithScalarsUpdateManyMutationInput').implement({
  fields: (t) => ({
    string: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
    boolean: t.field({"required":false,"type":NullableBoolFieldUpdateOperationsInput}),
    int: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
    float: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
    decimal: t.field({"required":false,"type":NullableDecimalFieldUpdateOperationsInput}),
    bigint: t.field({"required":false,"type":NullableBigIntFieldUpdateOperationsInput}),
    datetime: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
    bytes: t.field({"required":false,"type":NullableBytesFieldUpdateOperationsInput}),
  }),
});

export const IntFilter = builder.inputRef<Prisma.IntFilter>('IntFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntFilter}),
  }),
});

export const StringFilter = builder.inputRef<Prisma.StringFilter>('StringFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringFilter}),
  }),
});

export const DateTimeFilter = builder.inputRef<Prisma.DateTimeFilter>('DateTimeFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeFilter}),
  }),
});

export const PostListRelationFilter = builder.inputRef<Prisma.PostListRelationFilter>('PostListRelationFilter').implement({
  fields: (t) => ({
    every: t.field({"required":false,"type":PostWhereInput}),
    some: t.field({"required":false,"type":PostWhereInput}),
    none: t.field({"required":false,"type":PostWhereInput}),
  }),
});

export const CommentListRelationFilter = builder.inputRef<Prisma.CommentListRelationFilter>('CommentListRelationFilter').implement({
  fields: (t) => ({
    every: t.field({"required":false,"type":CommentWhereInput}),
    some: t.field({"required":false,"type":CommentWhereInput}),
    none: t.field({"required":false,"type":CommentWhereInput}),
  }),
});

export const DateTimeNullableFilter = builder.inputRef<Prisma.DateTimeNullableFilter>('DateTimeNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  }),
});

export const ProfileListRelationFilter = builder.inputRef<Prisma.ProfileListRelationFilter>('ProfileListRelationFilter').implement({
  fields: (t) => ({
    every: t.field({"required":false,"type":ProfileWhereInput}),
    some: t.field({"required":false,"type":ProfileWhereInput}),
    none: t.field({"required":false,"type":ProfileWhereInput}),
  }),
});

export const FollowListRelationFilter = builder.inputRef<Prisma.FollowListRelationFilter>('FollowListRelationFilter').implement({
  fields: (t) => ({
    every: t.field({"required":false,"type":FollowWhereInput}),
    some: t.field({"required":false,"type":FollowWhereInput}),
    none: t.field({"required":false,"type":FollowWhereInput}),
  }),
});

export const PostOrderByRelationAggregateInput = builder.inputRef<Prisma.PostOrderByRelationAggregateInput>('PostOrderByRelationAggregateInput').implement({
  fields: (t) => ({
    _count: t.field({"required":false,"type":SortOrder}),
  }),
});

export const CommentOrderByRelationAggregateInput = builder.inputRef<Prisma.CommentOrderByRelationAggregateInput>('CommentOrderByRelationAggregateInput').implement({
  fields: (t) => ({
    _count: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ProfileOrderByRelationAggregateInput = builder.inputRef<Prisma.ProfileOrderByRelationAggregateInput>('ProfileOrderByRelationAggregateInput').implement({
  fields: (t) => ({
    _count: t.field({"required":false,"type":SortOrder}),
  }),
});

export const FollowOrderByRelationAggregateInput = builder.inputRef<Prisma.FollowOrderByRelationAggregateInput>('FollowOrderByRelationAggregateInput').implement({
  fields: (t) => ({
    _count: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UserCountOrderByAggregateInput = builder.inputRef<Prisma.UserCountOrderByAggregateInput>('UserCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    firstName: t.field({"required":false,"type":SortOrder}),
    lastName: t.field({"required":false,"type":SortOrder}),
    birthdate: t.field({"required":false,"type":SortOrder}),
    login: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserAvgOrderByAggregateInput = builder.inputRef<Prisma.UserAvgOrderByAggregateInput>('UserAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UserMaxOrderByAggregateInput = builder.inputRef<Prisma.UserMaxOrderByAggregateInput>('UserMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    firstName: t.field({"required":false,"type":SortOrder}),
    lastName: t.field({"required":false,"type":SortOrder}),
    birthdate: t.field({"required":false,"type":SortOrder}),
    login: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserMinOrderByAggregateInput = builder.inputRef<Prisma.UserMinOrderByAggregateInput>('UserMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    firstName: t.field({"required":false,"type":SortOrder}),
    lastName: t.field({"required":false,"type":SortOrder}),
    birthdate: t.field({"required":false,"type":SortOrder}),
    login: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
    // 'password' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserSumOrderByAggregateInput = builder.inputRef<Prisma.UserSumOrderByAggregateInput>('UserSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IntWithAggregatesFilter = builder.inputRef<Prisma.IntWithAggregatesFilter>('IntWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntFilter}),
    _avg: t.field({"required":false,"type":NestedFloatFilter}),
    _sum: t.field({"required":false,"type":NestedIntFilter}),
    _min: t.field({"required":false,"type":NestedIntFilter}),
    _max: t.field({"required":false,"type":NestedIntFilter}),
  }),
});

export const StringWithAggregatesFilter = builder.inputRef<Prisma.StringWithAggregatesFilter>('StringWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntFilter}),
    _min: t.field({"required":false,"type":NestedStringFilter}),
    _max: t.field({"required":false,"type":NestedStringFilter}),
  }),
});

export const DateTimeWithAggregatesFilter = builder.inputRef<Prisma.DateTimeWithAggregatesFilter>('DateTimeWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntFilter}),
    _min: t.field({"required":false,"type":NestedDateTimeFilter}),
    _max: t.field({"required":false,"type":NestedDateTimeFilter}),
  }),
});

export const DateTimeNullableWithAggregatesFilter = builder.inputRef<Prisma.DateTimeNullableWithAggregatesFilter>('DateTimeNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
    _max: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  }),
});

export const UserRelationFilter = builder.inputRef<Prisma.UserRelationFilter>('UserRelationFilter').implement({
  fields: (t) => ({
    is: t.field({"required":false,"type":UserWhereInput}),
    isNot: t.field({"required":false,"type":UserWhereInput}),
  }),
});

export const PostCountOrderByAggregateInput = builder.inputRef<Prisma.PostCountOrderByAggregateInput>('PostCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    content: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const PostAvgOrderByAggregateInput = builder.inputRef<Prisma.PostAvgOrderByAggregateInput>('PostAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const PostMaxOrderByAggregateInput = builder.inputRef<Prisma.PostMaxOrderByAggregateInput>('PostMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    content: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const PostMinOrderByAggregateInput = builder.inputRef<Prisma.PostMinOrderByAggregateInput>('PostMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    content: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const PostSumOrderByAggregateInput = builder.inputRef<Prisma.PostSumOrderByAggregateInput>('PostSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ExtraModalCountOrderByAggregateInput = builder.inputRef<Prisma.ExtraModalCountOrderByAggregateInput>('ExtraModalCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ExtraModalAvgOrderByAggregateInput = builder.inputRef<Prisma.ExtraModalAvgOrderByAggregateInput>('ExtraModalAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ExtraModalMaxOrderByAggregateInput = builder.inputRef<Prisma.ExtraModalMaxOrderByAggregateInput>('ExtraModalMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ExtraModalMinOrderByAggregateInput = builder.inputRef<Prisma.ExtraModalMinOrderByAggregateInput>('ExtraModalMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    title: t.field({"required":false,"type":SortOrder}),
    createdAt: t.field({"required":false,"type":SortOrder}),
    updatedAt: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ExtraModalSumOrderByAggregateInput = builder.inputRef<Prisma.ExtraModalSumOrderByAggregateInput>('ExtraModalSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const PostRelationFilter = builder.inputRef<Prisma.PostRelationFilter>('PostRelationFilter').implement({
  fields: (t) => ({
    is: t.field({"required":false,"type":PostWhereInput}),
    isNot: t.field({"required":false,"type":PostWhereInput}),
  }),
});

export const CommentCountOrderByAggregateInput = builder.inputRef<Prisma.CommentCountOrderByAggregateInput>('CommentCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    comment: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const CommentAvgOrderByAggregateInput = builder.inputRef<Prisma.CommentAvgOrderByAggregateInput>('CommentAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const CommentMaxOrderByAggregateInput = builder.inputRef<Prisma.CommentMaxOrderByAggregateInput>('CommentMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    comment: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const CommentMinOrderByAggregateInput = builder.inputRef<Prisma.CommentMinOrderByAggregateInput>('CommentMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    comment: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const CommentSumOrderByAggregateInput = builder.inputRef<Prisma.CommentSumOrderByAggregateInput>('CommentSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    authorId: t.field({"required":false,"type":SortOrder}),
    postId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const StringNullableFilter = builder.inputRef<Prisma.StringNullableFilter>('StringNullableFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringNullableFilter}),
  }),
});

export const ProfileCountOrderByAggregateInput = builder.inputRef<Prisma.ProfileCountOrderByAggregateInput>('ProfileCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    bio: t.field({"required":false,"type":SortOrder}),
    userId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ProfileAvgOrderByAggregateInput = builder.inputRef<Prisma.ProfileAvgOrderByAggregateInput>('ProfileAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    userId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ProfileMaxOrderByAggregateInput = builder.inputRef<Prisma.ProfileMaxOrderByAggregateInput>('ProfileMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    bio: t.field({"required":false,"type":SortOrder}),
    userId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ProfileMinOrderByAggregateInput = builder.inputRef<Prisma.ProfileMinOrderByAggregateInput>('ProfileMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    bio: t.field({"required":false,"type":SortOrder}),
    userId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const ProfileSumOrderByAggregateInput = builder.inputRef<Prisma.ProfileSumOrderByAggregateInput>('ProfileSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    userId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const StringNullableWithAggregatesFilter = builder.inputRef<Prisma.StringNullableWithAggregatesFilter>('StringNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedStringNullableFilter}),
    _max: t.field({"required":false,"type":NestedStringNullableFilter}),
  }),
});

export const FollowCompositeIDCompoundUniqueInput = builder.inputRef<Prisma.FollowCompositeIDCompoundUniqueInput>('FollowCompositeIDCompoundUniqueInput').implement({
  fields: (t) => ({
    fromId: t.int({"required":true}),
    toId: t.int({"required":true}),
  }),
});

export const FollowCountOrderByAggregateInput = builder.inputRef<Prisma.FollowCountOrderByAggregateInput>('FollowCountOrderByAggregateInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const FollowAvgOrderByAggregateInput = builder.inputRef<Prisma.FollowAvgOrderByAggregateInput>('FollowAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const FollowMaxOrderByAggregateInput = builder.inputRef<Prisma.FollowMaxOrderByAggregateInput>('FollowMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const FollowMinOrderByAggregateInput = builder.inputRef<Prisma.FollowMinOrderByAggregateInput>('FollowMinOrderByAggregateInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const FollowSumOrderByAggregateInput = builder.inputRef<Prisma.FollowSumOrderByAggregateInput>('FollowSumOrderByAggregateInput').implement({
  fields: (t) => ({
    fromId: t.field({"required":false,"type":SortOrder}),
    toId: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UnrelatedCountOrderByAggregateInput = builder.inputRef<Prisma.UnrelatedCountOrderByAggregateInput>('UnrelatedCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UnrelatedAvgOrderByAggregateInput = builder.inputRef<Prisma.UnrelatedAvgOrderByAggregateInput>('UnrelatedAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UnrelatedMaxOrderByAggregateInput = builder.inputRef<Prisma.UnrelatedMaxOrderByAggregateInput>('UnrelatedMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UnrelatedMinOrderByAggregateInput = builder.inputRef<Prisma.UnrelatedMinOrderByAggregateInput>('UnrelatedMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const UnrelatedSumOrderByAggregateInput = builder.inputRef<Prisma.UnrelatedSumOrderByAggregateInput>('UnrelatedSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IdOnlyCountOrderByAggregateInput = builder.inputRef<Prisma.IdOnlyCountOrderByAggregateInput>('IdOnlyCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IdOnlyAvgOrderByAggregateInput = builder.inputRef<Prisma.IdOnlyAvgOrderByAggregateInput>('IdOnlyAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IdOnlyMaxOrderByAggregateInput = builder.inputRef<Prisma.IdOnlyMaxOrderByAggregateInput>('IdOnlyMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IdOnlyMinOrderByAggregateInput = builder.inputRef<Prisma.IdOnlyMinOrderByAggregateInput>('IdOnlyMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const IdOnlySumOrderByAggregateInput = builder.inputRef<Prisma.IdOnlySumOrderByAggregateInput>('IdOnlySumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithoutIDCountOrderByAggregateInput = builder.inputRef<Prisma.WithoutIDCountOrderByAggregateInput>('WithoutIDCountOrderByAggregateInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithoutIDMaxOrderByAggregateInput = builder.inputRef<Prisma.WithoutIDMaxOrderByAggregateInput>('WithoutIDMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithoutIDMinOrderByAggregateInput = builder.inputRef<Prisma.WithoutIDMinOrderByAggregateInput>('WithoutIDMinOrderByAggregateInput').implement({
  fields: (t) => ({
    name: t.field({"required":false,"type":SortOrder}),
  }),
});

export const BoolNullableFilter = builder.inputRef<Prisma.BoolNullableFilter>('BoolNullableFilter').implement({
  fields: (t) => ({
    equals: t.boolean({"required":false}),
    not: t.field({"required":false,"type":NestedBoolNullableFilter}),
  }),
});

export const IntNullableFilter = builder.inputRef<Prisma.IntNullableFilter>('IntNullableFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntNullableFilter}),
  }),
});

export const FloatNullableFilter = builder.inputRef<Prisma.FloatNullableFilter>('FloatNullableFilter').implement({
  fields: (t) => ({
    equals: t.float({"required":false}),
    in: t.floatList({"required":false}),
    notIn: t.floatList({"required":false}),
    lt: t.float({"required":false}),
    lte: t.float({"required":false}),
    gt: t.float({"required":false}),
    gte: t.float({"required":false}),
    not: t.field({"required":false,"type":NestedFloatNullableFilter}),
  }),
});

export const DecimalNullableFilter = builder.inputRef<Prisma.DecimalNullableFilter>('DecimalNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Decimal}),
    in: t.field({"required":false,"type":[Decimal]}),
    notIn: t.field({"required":false,"type":[Decimal]}),
    lt: t.field({"required":false,"type":Decimal}),
    lte: t.field({"required":false,"type":Decimal}),
    gt: t.field({"required":false,"type":Decimal}),
    gte: t.field({"required":false,"type":Decimal}),
    not: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  }),
});

export const BigIntNullableFilter = builder.inputRef<Prisma.BigIntNullableFilter>('BigIntNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bigint}),
    in: t.field({"required":false,"type":[Bigint]}),
    notIn: t.field({"required":false,"type":[Bigint]}),
    lt: t.field({"required":false,"type":Bigint}),
    lte: t.field({"required":false,"type":Bigint}),
    gt: t.field({"required":false,"type":Bigint}),
    gte: t.field({"required":false,"type":Bigint}),
    not: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  }),
});

export const BytesNullableFilter = builder.inputRef<Prisma.BytesNullableFilter>('BytesNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bytes}),
    in: t.field({"required":false,"type":[Bytes]}),
    notIn: t.field({"required":false,"type":[Bytes]}),
    not: t.field({"required":false,"type":NestedBytesNullableFilter}),
  }),
});

export const WithScalarsCountOrderByAggregateInput = builder.inputRef<Prisma.WithScalarsCountOrderByAggregateInput>('WithScalarsCountOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    string: t.field({"required":false,"type":SortOrder}),
    boolean: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
    datetime: t.field({"required":false,"type":SortOrder}),
    bytes: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithScalarsAvgOrderByAggregateInput = builder.inputRef<Prisma.WithScalarsAvgOrderByAggregateInput>('WithScalarsAvgOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithScalarsMaxOrderByAggregateInput = builder.inputRef<Prisma.WithScalarsMaxOrderByAggregateInput>('WithScalarsMaxOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    string: t.field({"required":false,"type":SortOrder}),
    boolean: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
    datetime: t.field({"required":false,"type":SortOrder}),
    bytes: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithScalarsMinOrderByAggregateInput = builder.inputRef<Prisma.WithScalarsMinOrderByAggregateInput>('WithScalarsMinOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    string: t.field({"required":false,"type":SortOrder}),
    boolean: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
    datetime: t.field({"required":false,"type":SortOrder}),
    bytes: t.field({"required":false,"type":SortOrder}),
  }),
});

export const WithScalarsSumOrderByAggregateInput = builder.inputRef<Prisma.WithScalarsSumOrderByAggregateInput>('WithScalarsSumOrderByAggregateInput').implement({
  fields: (t) => ({
    id: t.field({"required":false,"type":SortOrder}),
    int: t.field({"required":false,"type":SortOrder}),
    float: t.field({"required":false,"type":SortOrder}),
    decimal: t.field({"required":false,"type":SortOrder}),
    bigint: t.field({"required":false,"type":SortOrder}),
  }),
});

export const BoolNullableWithAggregatesFilter = builder.inputRef<Prisma.BoolNullableWithAggregatesFilter>('BoolNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.boolean({"required":false}),
    not: t.field({"required":false,"type":NestedBoolNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedBoolNullableFilter}),
    _max: t.field({"required":false,"type":NestedBoolNullableFilter}),
  }),
});

export const IntNullableWithAggregatesFilter = builder.inputRef<Prisma.IntNullableWithAggregatesFilter>('IntNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _sum: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedIntNullableFilter}),
    _max: t.field({"required":false,"type":NestedIntNullableFilter}),
  }),
});

export const FloatNullableWithAggregatesFilter = builder.inputRef<Prisma.FloatNullableWithAggregatesFilter>('FloatNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.float({"required":false}),
    in: t.floatList({"required":false}),
    notIn: t.floatList({"required":false}),
    lt: t.float({"required":false}),
    lte: t.float({"required":false}),
    gt: t.float({"required":false}),
    gte: t.float({"required":false}),
    not: t.field({"required":false,"type":NestedFloatNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _sum: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _min: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _max: t.field({"required":false,"type":NestedFloatNullableFilter}),
  }),
});

export const DecimalNullableWithAggregatesFilter = builder.inputRef<Prisma.DecimalNullableWithAggregatesFilter>('DecimalNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Decimal}),
    in: t.field({"required":false,"type":[Decimal]}),
    notIn: t.field({"required":false,"type":[Decimal]}),
    lt: t.field({"required":false,"type":Decimal}),
    lte: t.field({"required":false,"type":Decimal}),
    gt: t.field({"required":false,"type":Decimal}),
    gte: t.field({"required":false,"type":Decimal}),
    not: t.field({"required":false,"type":NestedDecimalNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedDecimalNullableFilter}),
    _sum: t.field({"required":false,"type":NestedDecimalNullableFilter}),
    _min: t.field({"required":false,"type":NestedDecimalNullableFilter}),
    _max: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  }),
});

export const BigIntNullableWithAggregatesFilter = builder.inputRef<Prisma.BigIntNullableWithAggregatesFilter>('BigIntNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bigint}),
    in: t.field({"required":false,"type":[Bigint]}),
    notIn: t.field({"required":false,"type":[Bigint]}),
    lt: t.field({"required":false,"type":Bigint}),
    lte: t.field({"required":false,"type":Bigint}),
    gt: t.field({"required":false,"type":Bigint}),
    gte: t.field({"required":false,"type":Bigint}),
    not: t.field({"required":false,"type":NestedBigIntNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _sum: t.field({"required":false,"type":NestedBigIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedBigIntNullableFilter}),
    _max: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  }),
});

export const BytesNullableWithAggregatesFilter = builder.inputRef<Prisma.BytesNullableWithAggregatesFilter>('BytesNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bytes}),
    in: t.field({"required":false,"type":[Bytes]}),
    notIn: t.field({"required":false,"type":[Bytes]}),
    not: t.field({"required":false,"type":NestedBytesNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedBytesNullableFilter}),
    _max: t.field({"required":false,"type":NestedBytesNullableFilter}),
  }),
});

export const PostCreateNestedManyWithoutAuthorInput = builder.inputRef<Prisma.PostCreateNestedManyWithoutAuthorInput>('PostCreateNestedManyWithoutAuthorInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":PostCreateWithoutAuthorInput}),
    connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutAuthorInput]}),
    connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  }),
});

export const CommentCreateNestedManyWithoutAuthorInput = builder.inputRef<Prisma.CommentCreateNestedManyWithoutAuthorInput>('CommentCreateNestedManyWithoutAuthorInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":CommentCreateWithoutAuthorInput}),
    connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutAuthorInput]}),
    connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  }),
});

export const ProfileCreateNestedManyWithoutUserInput = builder.inputRef<Prisma.ProfileCreateNestedManyWithoutUserInput>('ProfileCreateNestedManyWithoutUserInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":ProfileCreateWithoutUserInput}),
    connectOrCreate: t.field({"required":false,"type":[ProfileCreateOrConnectWithoutUserInput]}),
    connect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  }),
});

export const FollowCreateNestedManyWithoutToInput = builder.inputRef<Prisma.FollowCreateNestedManyWithoutToInput>('FollowCreateNestedManyWithoutToInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":FollowCreateWithoutToInput}),
    connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutToInput]}),
    connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  }),
});

export const FollowCreateNestedManyWithoutFromInput = builder.inputRef<Prisma.FollowCreateNestedManyWithoutFromInput>('FollowCreateNestedManyWithoutFromInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":FollowCreateWithoutFromInput}),
    connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutFromInput]}),
    connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  }),
});

export const StringFieldUpdateOperationsInput = builder.inputRef<Prisma.StringFieldUpdateOperationsInput>('StringFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.string({"required":false}),
  }),
});

export const DateTimeFieldUpdateOperationsInput = builder.inputRef<Prisma.DateTimeFieldUpdateOperationsInput>('DateTimeFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.field({"required":false,"type":DateTime}),
  }),
});

export const PostUpdateManyWithoutAuthorNestedInput = builder.inputRef<Prisma.PostUpdateManyWithoutAuthorNestedInput>('PostUpdateManyWithoutAuthorNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":PostCreateWithoutAuthorInput}),
    connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutAuthorInput]}),
    upsert: t.field({"required":false,"type":[PostUpsertWithWhereUniqueWithoutAuthorInput]}),
    set: t.field({"required":false,"type":[PostWhereUniqueInput]}),
    disconnect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
    delete: t.field({"required":false,"type":[PostWhereUniqueInput]}),
    connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
    update: t.field({"required":false,"type":[PostUpdateWithWhereUniqueWithoutAuthorInput]}),
    updateMany: t.field({"required":false,"type":[PostUpdateManyWithWhereWithoutAuthorInput]}),
    deleteMany: t.field({"required":false,"type":[PostScalarWhereInput]}),
  }),
});

export const CommentUpdateManyWithoutAuthorNestedInput = builder.inputRef<Prisma.CommentUpdateManyWithoutAuthorNestedInput>('CommentUpdateManyWithoutAuthorNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":CommentCreateWithoutAuthorInput}),
    connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutAuthorInput]}),
    upsert: t.field({"required":false,"type":[CommentUpsertWithWhereUniqueWithoutAuthorInput]}),
    set: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    disconnect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    delete: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    update: t.field({"required":false,"type":[CommentUpdateWithWhereUniqueWithoutAuthorInput]}),
    updateMany: t.field({"required":false,"type":[CommentUpdateManyWithWhereWithoutAuthorInput]}),
    deleteMany: t.field({"required":false,"type":[CommentScalarWhereInput]}),
  }),
});

export const NullableDateTimeFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableDateTimeFieldUpdateOperationsInput>('NullableDateTimeFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.field({"required":false,"type":DateTime}),
  }),
});

export const ProfileUpdateManyWithoutUserNestedInput = builder.inputRef<Prisma.ProfileUpdateManyWithoutUserNestedInput>('ProfileUpdateManyWithoutUserNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":ProfileCreateWithoutUserInput}),
    connectOrCreate: t.field({"required":false,"type":[ProfileCreateOrConnectWithoutUserInput]}),
    upsert: t.field({"required":false,"type":[ProfileUpsertWithWhereUniqueWithoutUserInput]}),
    set: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
    disconnect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
    delete: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
    connect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
    update: t.field({"required":false,"type":[ProfileUpdateWithWhereUniqueWithoutUserInput]}),
    updateMany: t.field({"required":false,"type":[ProfileUpdateManyWithWhereWithoutUserInput]}),
    deleteMany: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
  }),
});

export const FollowUpdateManyWithoutToNestedInput = builder.inputRef<Prisma.FollowUpdateManyWithoutToNestedInput>('FollowUpdateManyWithoutToNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":FollowCreateWithoutToInput}),
    connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutToInput]}),
    upsert: t.field({"required":false,"type":[FollowUpsertWithWhereUniqueWithoutToInput]}),
    set: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    disconnect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    delete: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    update: t.field({"required":false,"type":[FollowUpdateWithWhereUniqueWithoutToInput]}),
    updateMany: t.field({"required":false,"type":[FollowUpdateManyWithWhereWithoutToInput]}),
    deleteMany: t.field({"required":false,"type":[FollowScalarWhereInput]}),
  }),
});

export const FollowUpdateManyWithoutFromNestedInput = builder.inputRef<Prisma.FollowUpdateManyWithoutFromNestedInput>('FollowUpdateManyWithoutFromNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":FollowCreateWithoutFromInput}),
    connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutFromInput]}),
    upsert: t.field({"required":false,"type":[FollowUpsertWithWhereUniqueWithoutFromInput]}),
    set: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    disconnect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    delete: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
    update: t.field({"required":false,"type":[FollowUpdateWithWhereUniqueWithoutFromInput]}),
    updateMany: t.field({"required":false,"type":[FollowUpdateManyWithWhereWithoutFromInput]}),
    deleteMany: t.field({"required":false,"type":[FollowScalarWhereInput]}),
  }),
});

export const IntFieldUpdateOperationsInput = builder.inputRef<Prisma.IntFieldUpdateOperationsInput>('IntFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.int({"required":false}),
    increment: t.int({"required":false}),
    decrement: t.int({"required":false}),
    multiply: t.int({"required":false}),
    divide: t.int({"required":false}),
  }),
});

export const UserCreateNestedOneWithoutPostsInput = builder.inputRef<Prisma.UserCreateNestedOneWithoutPostsInput>('UserCreateNestedOneWithoutPostsInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutPostsInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutPostsInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  }),
});

export const CommentCreateNestedManyWithoutPostInput = builder.inputRef<Prisma.CommentCreateNestedManyWithoutPostInput>('CommentCreateNestedManyWithoutPostInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":CommentCreateWithoutPostInput}),
    connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutPostInput]}),
    connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  }),
});

export const UserUpdateOneRequiredWithoutPostsNestedInput = builder.inputRef<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput>('UserUpdateOneRequiredWithoutPostsNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutPostsInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutPostsInput}),
    upsert: t.field({"required":false,"type":UserUpsertWithoutPostsInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
    update: t.field({"required":false,"type":UserUpdateWithoutPostsInput}),
  }),
});

export const CommentUpdateManyWithoutPostNestedInput = builder.inputRef<Prisma.CommentUpdateManyWithoutPostNestedInput>('CommentUpdateManyWithoutPostNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":CommentCreateWithoutPostInput}),
    connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutPostInput]}),
    upsert: t.field({"required":false,"type":[CommentUpsertWithWhereUniqueWithoutPostInput]}),
    set: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    disconnect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    delete: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
    update: t.field({"required":false,"type":[CommentUpdateWithWhereUniqueWithoutPostInput]}),
    updateMany: t.field({"required":false,"type":[CommentUpdateManyWithWhereWithoutPostInput]}),
    deleteMany: t.field({"required":false,"type":[CommentScalarWhereInput]}),
  }),
});

export const UserCreateNestedOneWithoutCommentsInput = builder.inputRef<Prisma.UserCreateNestedOneWithoutCommentsInput>('UserCreateNestedOneWithoutCommentsInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutCommentsInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutCommentsInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  }),
});

export const PostCreateNestedOneWithoutCommentsInput = builder.inputRef<Prisma.PostCreateNestedOneWithoutCommentsInput>('PostCreateNestedOneWithoutCommentsInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":PostCreateWithoutCommentsInput}),
    connectOrCreate: t.field({"required":false,"type":PostCreateOrConnectWithoutCommentsInput}),
    connect: t.field({"required":false,"type":PostWhereUniqueInput}),
  }),
});

export const UserUpdateOneRequiredWithoutCommentsNestedInput = builder.inputRef<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput>('UserUpdateOneRequiredWithoutCommentsNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutCommentsInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutCommentsInput}),
    upsert: t.field({"required":false,"type":UserUpsertWithoutCommentsInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
    update: t.field({"required":false,"type":UserUpdateWithoutCommentsInput}),
  }),
});

export const PostUpdateOneRequiredWithoutCommentsNestedInput = builder.inputRef<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput>('PostUpdateOneRequiredWithoutCommentsNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":PostCreateWithoutCommentsInput}),
    connectOrCreate: t.field({"required":false,"type":PostCreateOrConnectWithoutCommentsInput}),
    upsert: t.field({"required":false,"type":PostUpsertWithoutCommentsInput}),
    connect: t.field({"required":false,"type":PostWhereUniqueInput}),
    update: t.field({"required":false,"type":PostUpdateWithoutCommentsInput}),
  }),
});

export const UserCreateNestedOneWithoutProfileInput = builder.inputRef<Prisma.UserCreateNestedOneWithoutProfileInput>('UserCreateNestedOneWithoutProfileInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutProfileInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutProfileInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  }),
});

export const NullableStringFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableStringFieldUpdateOperationsInput>('NullableStringFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.string({"required":false}),
  }),
});

export const UserUpdateOneRequiredWithoutProfileNestedInput = builder.inputRef<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput>('UserUpdateOneRequiredWithoutProfileNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutProfileInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutProfileInput}),
    upsert: t.field({"required":false,"type":UserUpsertWithoutProfileInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
    update: t.field({"required":false,"type":UserUpdateWithoutProfileInput}),
  }),
});

export const UserCreateNestedOneWithoutFollowingInput = builder.inputRef<Prisma.UserCreateNestedOneWithoutFollowingInput>('UserCreateNestedOneWithoutFollowingInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutFollowingInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowingInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  }),
});

export const UserCreateNestedOneWithoutFollowersInput = builder.inputRef<Prisma.UserCreateNestedOneWithoutFollowersInput>('UserCreateNestedOneWithoutFollowersInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutFollowersInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowersInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  }),
});

export const UserUpdateOneRequiredWithoutFollowingNestedInput = builder.inputRef<Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput>('UserUpdateOneRequiredWithoutFollowingNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutFollowingInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowingInput}),
    upsert: t.field({"required":false,"type":UserUpsertWithoutFollowingInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
    update: t.field({"required":false,"type":UserUpdateWithoutFollowingInput}),
  }),
});

export const UserUpdateOneRequiredWithoutFollowersNestedInput = builder.inputRef<Prisma.UserUpdateOneRequiredWithoutFollowersNestedInput>('UserUpdateOneRequiredWithoutFollowersNestedInput').implement({
  fields: (t) => ({
    create: t.field({"required":false,"type":UserCreateWithoutFollowersInput}),
    connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowersInput}),
    upsert: t.field({"required":false,"type":UserUpsertWithoutFollowersInput}),
    connect: t.field({"required":false,"type":UserWhereUniqueInput}),
    update: t.field({"required":false,"type":UserUpdateWithoutFollowersInput}),
  }),
});

export const NullableBoolFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableBoolFieldUpdateOperationsInput>('NullableBoolFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.boolean({"required":false}),
  }),
});

export const NullableIntFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableIntFieldUpdateOperationsInput>('NullableIntFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.int({"required":false}),
    increment: t.int({"required":false}),
    decrement: t.int({"required":false}),
    multiply: t.int({"required":false}),
    divide: t.int({"required":false}),
  }),
});

export const NullableFloatFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableFloatFieldUpdateOperationsInput>('NullableFloatFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.float({"required":false}),
    increment: t.float({"required":false}),
    decrement: t.float({"required":false}),
    multiply: t.float({"required":false}),
    divide: t.float({"required":false}),
  }),
});

export const NullableDecimalFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableDecimalFieldUpdateOperationsInput>('NullableDecimalFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.field({"required":false,"type":Decimal}),
    increment: t.field({"required":false,"type":Decimal}),
    decrement: t.field({"required":false,"type":Decimal}),
    multiply: t.field({"required":false,"type":Decimal}),
    divide: t.field({"required":false,"type":Decimal}),
  }),
});

export const NullableBigIntFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableBigIntFieldUpdateOperationsInput>('NullableBigIntFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.field({"required":false,"type":Bigint}),
    increment: t.field({"required":false,"type":Bigint}),
    decrement: t.field({"required":false,"type":Bigint}),
    multiply: t.field({"required":false,"type":Bigint}),
    divide: t.field({"required":false,"type":Bigint}),
  }),
});

export const NullableBytesFieldUpdateOperationsInput = builder.inputRef<Prisma.NullableBytesFieldUpdateOperationsInput>('NullableBytesFieldUpdateOperationsInput').implement({
  fields: (t) => ({
    set: t.field({"required":false,"type":Bytes}),
  }),
});

export const NestedIntFilter = builder.inputRef<Prisma.NestedIntFilter>('NestedIntFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntFilter}),
  }),
});

export const NestedStringFilter = builder.inputRef<Prisma.NestedStringFilter>('NestedStringFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringFilter}),
  }),
});

export const NestedDateTimeFilter = builder.inputRef<Prisma.NestedDateTimeFilter>('NestedDateTimeFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeFilter}),
  }),
});

export const NestedDateTimeNullableFilter = builder.inputRef<Prisma.NestedDateTimeNullableFilter>('NestedDateTimeNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  }),
});

export const NestedIntWithAggregatesFilter = builder.inputRef<Prisma.NestedIntWithAggregatesFilter>('NestedIntWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntFilter}),
    _avg: t.field({"required":false,"type":NestedFloatFilter}),
    _sum: t.field({"required":false,"type":NestedIntFilter}),
    _min: t.field({"required":false,"type":NestedIntFilter}),
    _max: t.field({"required":false,"type":NestedIntFilter}),
  }),
});

export const NestedFloatFilter = builder.inputRef<Prisma.NestedFloatFilter>('NestedFloatFilter').implement({
  fields: (t) => ({
    equals: t.float({"required":false}),
    in: t.floatList({"required":false}),
    notIn: t.floatList({"required":false}),
    lt: t.float({"required":false}),
    lte: t.float({"required":false}),
    gt: t.float({"required":false}),
    gte: t.float({"required":false}),
    not: t.field({"required":false,"type":NestedFloatFilter}),
  }),
});

export const NestedStringWithAggregatesFilter = builder.inputRef<Prisma.NestedStringWithAggregatesFilter>('NestedStringWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntFilter}),
    _min: t.field({"required":false,"type":NestedStringFilter}),
    _max: t.field({"required":false,"type":NestedStringFilter}),
  }),
});

export const NestedDateTimeWithAggregatesFilter = builder.inputRef<Prisma.NestedDateTimeWithAggregatesFilter>('NestedDateTimeWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntFilter}),
    _min: t.field({"required":false,"type":NestedDateTimeFilter}),
    _max: t.field({"required":false,"type":NestedDateTimeFilter}),
  }),
});

export const NestedDateTimeNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedDateTimeNullableWithAggregatesFilter>('NestedDateTimeNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":DateTime}),
    in: t.field({"required":false,"type":[DateTime]}),
    notIn: t.field({"required":false,"type":[DateTime]}),
    lt: t.field({"required":false,"type":DateTime}),
    lte: t.field({"required":false,"type":DateTime}),
    gt: t.field({"required":false,"type":DateTime}),
    gte: t.field({"required":false,"type":DateTime}),
    not: t.field({"required":false,"type":NestedDateTimeNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
    _max: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  }),
});

export const NestedIntNullableFilter = builder.inputRef<Prisma.NestedIntNullableFilter>('NestedIntNullableFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntNullableFilter}),
  }),
});

export const NestedStringNullableFilter = builder.inputRef<Prisma.NestedStringNullableFilter>('NestedStringNullableFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringNullableFilter}),
  }),
});

export const NestedStringNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedStringNullableWithAggregatesFilter>('NestedStringNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.string({"required":false}),
    in: t.stringList({"required":false}),
    notIn: t.stringList({"required":false}),
    lt: t.string({"required":false}),
    lte: t.string({"required":false}),
    gt: t.string({"required":false}),
    gte: t.string({"required":false}),
    contains: t.string({"required":false}),
    startsWith: t.string({"required":false}),
    endsWith: t.string({"required":false}),
    not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedStringNullableFilter}),
    _max: t.field({"required":false,"type":NestedStringNullableFilter}),
  }),
});

export const NestedBoolNullableFilter = builder.inputRef<Prisma.NestedBoolNullableFilter>('NestedBoolNullableFilter').implement({
  fields: (t) => ({
    equals: t.boolean({"required":false}),
    not: t.field({"required":false,"type":NestedBoolNullableFilter}),
  }),
});

export const NestedFloatNullableFilter = builder.inputRef<Prisma.NestedFloatNullableFilter>('NestedFloatNullableFilter').implement({
  fields: (t) => ({
    equals: t.float({"required":false}),
    in: t.floatList({"required":false}),
    notIn: t.floatList({"required":false}),
    lt: t.float({"required":false}),
    lte: t.float({"required":false}),
    gt: t.float({"required":false}),
    gte: t.float({"required":false}),
    not: t.field({"required":false,"type":NestedFloatNullableFilter}),
  }),
});

export const NestedDecimalNullableFilter = builder.inputRef<Prisma.NestedDecimalNullableFilter>('NestedDecimalNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Decimal}),
    in: t.field({"required":false,"type":[Decimal]}),
    notIn: t.field({"required":false,"type":[Decimal]}),
    lt: t.field({"required":false,"type":Decimal}),
    lte: t.field({"required":false,"type":Decimal}),
    gt: t.field({"required":false,"type":Decimal}),
    gte: t.field({"required":false,"type":Decimal}),
    not: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  }),
});

export const NestedBigIntNullableFilter = builder.inputRef<Prisma.NestedBigIntNullableFilter>('NestedBigIntNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bigint}),
    in: t.field({"required":false,"type":[Bigint]}),
    notIn: t.field({"required":false,"type":[Bigint]}),
    lt: t.field({"required":false,"type":Bigint}),
    lte: t.field({"required":false,"type":Bigint}),
    gt: t.field({"required":false,"type":Bigint}),
    gte: t.field({"required":false,"type":Bigint}),
    not: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  }),
});

export const NestedBytesNullableFilter = builder.inputRef<Prisma.NestedBytesNullableFilter>('NestedBytesNullableFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bytes}),
    in: t.field({"required":false,"type":[Bytes]}),
    notIn: t.field({"required":false,"type":[Bytes]}),
    not: t.field({"required":false,"type":NestedBytesNullableFilter}),
  }),
});

export const NestedBoolNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedBoolNullableWithAggregatesFilter>('NestedBoolNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.boolean({"required":false}),
    not: t.field({"required":false,"type":NestedBoolNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedBoolNullableFilter}),
    _max: t.field({"required":false,"type":NestedBoolNullableFilter}),
  }),
});

export const NestedIntNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedIntNullableWithAggregatesFilter>('NestedIntNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.int({"required":false}),
    in: t.intList({"required":false}),
    notIn: t.intList({"required":false}),
    lt: t.int({"required":false}),
    lte: t.int({"required":false}),
    gt: t.int({"required":false}),
    gte: t.int({"required":false}),
    not: t.field({"required":false,"type":NestedIntNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _sum: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedIntNullableFilter}),
    _max: t.field({"required":false,"type":NestedIntNullableFilter}),
  }),
});

export const NestedFloatNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedFloatNullableWithAggregatesFilter>('NestedFloatNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.float({"required":false}),
    in: t.floatList({"required":false}),
    notIn: t.floatList({"required":false}),
    lt: t.float({"required":false}),
    lte: t.float({"required":false}),
    gt: t.float({"required":false}),
    gte: t.float({"required":false}),
    not: t.field({"required":false,"type":NestedFloatNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _sum: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _min: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _max: t.field({"required":false,"type":NestedFloatNullableFilter}),
  }),
});

export const NestedDecimalNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedDecimalNullableWithAggregatesFilter>('NestedDecimalNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Decimal}),
    in: t.field({"required":false,"type":[Decimal]}),
    notIn: t.field({"required":false,"type":[Decimal]}),
    lt: t.field({"required":false,"type":Decimal}),
    lte: t.field({"required":false,"type":Decimal}),
    gt: t.field({"required":false,"type":Decimal}),
    gte: t.field({"required":false,"type":Decimal}),
    not: t.field({"required":false,"type":NestedDecimalNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedDecimalNullableFilter}),
    _sum: t.field({"required":false,"type":NestedDecimalNullableFilter}),
    _min: t.field({"required":false,"type":NestedDecimalNullableFilter}),
    _max: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  }),
});

export const NestedBigIntNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedBigIntNullableWithAggregatesFilter>('NestedBigIntNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bigint}),
    in: t.field({"required":false,"type":[Bigint]}),
    notIn: t.field({"required":false,"type":[Bigint]}),
    lt: t.field({"required":false,"type":Bigint}),
    lte: t.field({"required":false,"type":Bigint}),
    gt: t.field({"required":false,"type":Bigint}),
    gte: t.field({"required":false,"type":Bigint}),
    not: t.field({"required":false,"type":NestedBigIntNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
    _sum: t.field({"required":false,"type":NestedBigIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedBigIntNullableFilter}),
    _max: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  }),
});

export const NestedBytesNullableWithAggregatesFilter = builder.inputRef<Prisma.NestedBytesNullableWithAggregatesFilter>('NestedBytesNullableWithAggregatesFilter').implement({
  fields: (t) => ({
    equals: t.field({"required":false,"type":Bytes}),
    in: t.field({"required":false,"type":[Bytes]}),
    notIn: t.field({"required":false,"type":[Bytes]}),
    not: t.field({"required":false,"type":NestedBytesNullableWithAggregatesFilter}),
    _count: t.field({"required":false,"type":NestedIntNullableFilter}),
    _min: t.field({"required":false,"type":NestedBytesNullableFilter}),
    _max: t.field({"required":false,"type":NestedBytesNullableFilter}),
  }),
});

export const PostCreateWithoutAuthorInput = builder.inputRef<Prisma.PostCreateWithoutAuthorInput>('PostCreateWithoutAuthorInput').implement({
  fields: (t) => ({
    title: t.string({"required":true}),
    content: t.string({"required":true}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutPostInput}),
  }),
});

export const PostCreateOrConnectWithoutAuthorInput = builder.inputRef<Prisma.PostCreateOrConnectWithoutAuthorInput>('PostCreateOrConnectWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":PostWhereUniqueInput}),
    create: t.field({"required":true,"type":PostCreateWithoutAuthorInput}),
  }),
});

export const CommentCreateWithoutAuthorInput = builder.inputRef<Prisma.CommentCreateWithoutAuthorInput>('CommentCreateWithoutAuthorInput').implement({
  fields: (t) => ({
    comment: t.string({"required":true}),
    Post: t.field({"required":true,"type":PostCreateNestedOneWithoutCommentsInput}),
  }),
});

export const CommentCreateOrConnectWithoutAuthorInput = builder.inputRef<Prisma.CommentCreateOrConnectWithoutAuthorInput>('CommentCreateOrConnectWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentWhereUniqueInput}),
    create: t.field({"required":true,"type":CommentCreateWithoutAuthorInput}),
  }),
});

export const ProfileCreateWithoutUserInput = builder.inputRef<Prisma.ProfileCreateWithoutUserInput>('ProfileCreateWithoutUserInput').implement({
  fields: (t) => ({
    bio: t.string({"required":false}),
  }),
});

export const ProfileCreateOrConnectWithoutUserInput = builder.inputRef<Prisma.ProfileCreateOrConnectWithoutUserInput>('ProfileCreateOrConnectWithoutUserInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":ProfileWhereUniqueInput}),
    create: t.field({"required":true,"type":ProfileCreateWithoutUserInput}),
  }),
});

export const FollowCreateWithoutToInput = builder.inputRef<Prisma.FollowCreateWithoutToInput>('FollowCreateWithoutToInput').implement({
  fields: (t) => ({
    From: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowingInput}),
  }),
});

export const FollowCreateOrConnectWithoutToInput = builder.inputRef<Prisma.FollowCreateOrConnectWithoutToInput>('FollowCreateOrConnectWithoutToInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowWhereUniqueInput}),
    create: t.field({"required":true,"type":FollowCreateWithoutToInput}),
  }),
});

export const FollowCreateWithoutFromInput = builder.inputRef<Prisma.FollowCreateWithoutFromInput>('FollowCreateWithoutFromInput').implement({
  fields: (t) => ({
    To: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowersInput}),
  }),
});

export const FollowCreateOrConnectWithoutFromInput = builder.inputRef<Prisma.FollowCreateOrConnectWithoutFromInput>('FollowCreateOrConnectWithoutFromInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowWhereUniqueInput}),
    create: t.field({"required":true,"type":FollowCreateWithoutFromInput}),
  }),
});

export const PostUpsertWithWhereUniqueWithoutAuthorInput = builder.inputRef<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput>('PostUpsertWithWhereUniqueWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":PostWhereUniqueInput}),
    update: t.field({"required":true,"type":PostUpdateWithoutAuthorInput}),
    create: t.field({"required":true,"type":PostCreateWithoutAuthorInput}),
  }),
});

export const PostUpdateWithWhereUniqueWithoutAuthorInput = builder.inputRef<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput>('PostUpdateWithWhereUniqueWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":PostWhereUniqueInput}),
    data: t.field({"required":true,"type":PostUpdateWithoutAuthorInput}),
  }),
});

export const PostUpdateManyWithWhereWithoutAuthorInput = builder.inputRef<Prisma.PostUpdateManyWithWhereWithoutAuthorInput>('PostUpdateManyWithWhereWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":PostScalarWhereInput}),
    data: t.field({"required":true,"type":PostUpdateManyMutationInput}),
  }),
});

export const PostScalarWhereInput = builder.inputRef<Prisma.PostScalarWhereInput>('PostScalarWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[PostScalarWhereInput]}),
    OR: t.field({"required":false,"type":[PostScalarWhereInput]}),
    NOT: t.field({"required":false,"type":[PostScalarWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    title: t.field({"required":false,"type":StringFilter}),
    content: t.field({"required":false,"type":StringFilter}),
    authorId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const CommentUpsertWithWhereUniqueWithoutAuthorInput = builder.inputRef<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput>('CommentUpsertWithWhereUniqueWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentWhereUniqueInput}),
    update: t.field({"required":true,"type":CommentUpdateWithoutAuthorInput}),
    create: t.field({"required":true,"type":CommentCreateWithoutAuthorInput}),
  }),
});

export const CommentUpdateWithWhereUniqueWithoutAuthorInput = builder.inputRef<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput>('CommentUpdateWithWhereUniqueWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentWhereUniqueInput}),
    data: t.field({"required":true,"type":CommentUpdateWithoutAuthorInput}),
  }),
});

export const CommentUpdateManyWithWhereWithoutAuthorInput = builder.inputRef<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput>('CommentUpdateManyWithWhereWithoutAuthorInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentScalarWhereInput}),
    data: t.field({"required":true,"type":CommentUpdateManyMutationInput}),
  }),
});

export const CommentScalarWhereInput = builder.inputRef<Prisma.CommentScalarWhereInput>('CommentScalarWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[CommentScalarWhereInput]}),
    OR: t.field({"required":false,"type":[CommentScalarWhereInput]}),
    NOT: t.field({"required":false,"type":[CommentScalarWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    comment: t.field({"required":false,"type":StringFilter}),
    authorId: t.field({"required":false,"type":IntFilter}),
    postId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const ProfileUpsertWithWhereUniqueWithoutUserInput = builder.inputRef<Prisma.ProfileUpsertWithWhereUniqueWithoutUserInput>('ProfileUpsertWithWhereUniqueWithoutUserInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":ProfileWhereUniqueInput}),
    update: t.field({"required":true,"type":ProfileUpdateWithoutUserInput}),
    create: t.field({"required":true,"type":ProfileCreateWithoutUserInput}),
  }),
});

export const ProfileUpdateWithWhereUniqueWithoutUserInput = builder.inputRef<Prisma.ProfileUpdateWithWhereUniqueWithoutUserInput>('ProfileUpdateWithWhereUniqueWithoutUserInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":ProfileWhereUniqueInput}),
    data: t.field({"required":true,"type":ProfileUpdateWithoutUserInput}),
  }),
});

export const ProfileUpdateManyWithWhereWithoutUserInput = builder.inputRef<Prisma.ProfileUpdateManyWithWhereWithoutUserInput>('ProfileUpdateManyWithWhereWithoutUserInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":ProfileScalarWhereInput}),
    data: t.field({"required":true,"type":ProfileUpdateManyMutationInput}),
  }),
});

export const ProfileScalarWhereInput = builder.inputRef<Prisma.ProfileScalarWhereInput>('ProfileScalarWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
    OR: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
    NOT: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
    id: t.field({"required":false,"type":IntFilter}),
    bio: t.field({"required":false,"type":StringNullableFilter}),
    userId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const FollowUpsertWithWhereUniqueWithoutToInput = builder.inputRef<Prisma.FollowUpsertWithWhereUniqueWithoutToInput>('FollowUpsertWithWhereUniqueWithoutToInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowWhereUniqueInput}),
    update: t.field({"required":true,"type":FollowUpdateWithoutToInput}),
    create: t.field({"required":true,"type":FollowCreateWithoutToInput}),
  }),
});

export const FollowUpdateWithWhereUniqueWithoutToInput = builder.inputRef<Prisma.FollowUpdateWithWhereUniqueWithoutToInput>('FollowUpdateWithWhereUniqueWithoutToInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowWhereUniqueInput}),
    data: t.field({"required":true,"type":FollowUpdateWithoutToInput}),
  }),
});

export const FollowUpdateManyWithWhereWithoutToInput = builder.inputRef<Prisma.FollowUpdateManyWithWhereWithoutToInput>('FollowUpdateManyWithWhereWithoutToInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowScalarWhereInput}),
    data: t.field({"required":true,"type":FollowUpdateManyMutationInput}),
  }),
});

export const FollowScalarWhereInput = builder.inputRef<Prisma.FollowScalarWhereInput>('FollowScalarWhereInput').implement({
  fields: (t) => ({
    AND: t.field({"required":false,"type":[FollowScalarWhereInput]}),
    OR: t.field({"required":false,"type":[FollowScalarWhereInput]}),
    NOT: t.field({"required":false,"type":[FollowScalarWhereInput]}),
    fromId: t.field({"required":false,"type":IntFilter}),
    toId: t.field({"required":false,"type":IntFilter}),
  }),
});

export const FollowUpsertWithWhereUniqueWithoutFromInput = builder.inputRef<Prisma.FollowUpsertWithWhereUniqueWithoutFromInput>('FollowUpsertWithWhereUniqueWithoutFromInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowWhereUniqueInput}),
    update: t.field({"required":true,"type":FollowUpdateWithoutFromInput}),
    create: t.field({"required":true,"type":FollowCreateWithoutFromInput}),
  }),
});

export const FollowUpdateWithWhereUniqueWithoutFromInput = builder.inputRef<Prisma.FollowUpdateWithWhereUniqueWithoutFromInput>('FollowUpdateWithWhereUniqueWithoutFromInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowWhereUniqueInput}),
    data: t.field({"required":true,"type":FollowUpdateWithoutFromInput}),
  }),
});

export const FollowUpdateManyWithWhereWithoutFromInput = builder.inputRef<Prisma.FollowUpdateManyWithWhereWithoutFromInput>('FollowUpdateManyWithWhereWithoutFromInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":FollowScalarWhereInput}),
    data: t.field({"required":true,"type":FollowUpdateManyMutationInput}),
  }),
});

export const UserCreateWithoutPostsInput = builder.inputRef<Prisma.UserCreateWithoutPostsInput>('UserCreateWithoutPostsInput').implement({
  fields: (t) => ({
    firstName: t.string({"required":true}),
    lastName: t.string({"required":true}),
    birthdate: t.field({"required":true,"type":DateTime}),
    login: t.string({"required":true}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
    Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
    Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
    Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserCreateOrConnectWithoutPostsInput = builder.inputRef<Prisma.UserCreateOrConnectWithoutPostsInput>('UserCreateOrConnectWithoutPostsInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":UserWhereUniqueInput}),
    create: t.field({"required":true,"type":UserCreateWithoutPostsInput}),
  }),
});

export const CommentCreateWithoutPostInput = builder.inputRef<Prisma.CommentCreateWithoutPostInput>('CommentCreateWithoutPostInput').implement({
  fields: (t) => ({
    comment: t.string({"required":true}),
    Author: t.field({"required":true,"type":UserCreateNestedOneWithoutCommentsInput}),
  }),
});

export const CommentCreateOrConnectWithoutPostInput = builder.inputRef<Prisma.CommentCreateOrConnectWithoutPostInput>('CommentCreateOrConnectWithoutPostInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentWhereUniqueInput}),
    create: t.field({"required":true,"type":CommentCreateWithoutPostInput}),
  }),
});

export const UserUpsertWithoutPostsInput = builder.inputRef<Prisma.UserUpsertWithoutPostsInput>('UserUpsertWithoutPostsInput').implement({
  fields: (t) => ({
    update: t.field({"required":true,"type":UserUpdateWithoutPostsInput}),
    create: t.field({"required":true,"type":UserCreateWithoutPostsInput}),
  }),
});

export const UserUpdateWithoutPostsInput = builder.inputRef<Prisma.UserUpdateWithoutPostsInput>('UserUpdateWithoutPostsInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
    Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
    Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
    Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const CommentUpsertWithWhereUniqueWithoutPostInput = builder.inputRef<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput>('CommentUpsertWithWhereUniqueWithoutPostInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentWhereUniqueInput}),
    update: t.field({"required":true,"type":CommentUpdateWithoutPostInput}),
    create: t.field({"required":true,"type":CommentCreateWithoutPostInput}),
  }),
});

export const CommentUpdateWithWhereUniqueWithoutPostInput = builder.inputRef<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput>('CommentUpdateWithWhereUniqueWithoutPostInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentWhereUniqueInput}),
    data: t.field({"required":true,"type":CommentUpdateWithoutPostInput}),
  }),
});

export const CommentUpdateManyWithWhereWithoutPostInput = builder.inputRef<Prisma.CommentUpdateManyWithWhereWithoutPostInput>('CommentUpdateManyWithWhereWithoutPostInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":CommentScalarWhereInput}),
    data: t.field({"required":true,"type":CommentUpdateManyMutationInput}),
  }),
});

export const UserCreateWithoutCommentsInput = builder.inputRef<Prisma.UserCreateWithoutCommentsInput>('UserCreateWithoutCommentsInput').implement({
  fields: (t) => ({
    firstName: t.string({"required":true}),
    lastName: t.string({"required":true}),
    birthdate: t.field({"required":true,"type":DateTime}),
    login: t.string({"required":true}),
    Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
    Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
    Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
    Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserCreateOrConnectWithoutCommentsInput = builder.inputRef<Prisma.UserCreateOrConnectWithoutCommentsInput>('UserCreateOrConnectWithoutCommentsInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":UserWhereUniqueInput}),
    create: t.field({"required":true,"type":UserCreateWithoutCommentsInput}),
  }),
});

export const PostCreateWithoutCommentsInput = builder.inputRef<Prisma.PostCreateWithoutCommentsInput>('PostCreateWithoutCommentsInput').implement({
  fields: (t) => ({
    title: t.string({"required":true}),
    content: t.string({"required":true}),
    Author: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
  }),
});

export const PostCreateOrConnectWithoutCommentsInput = builder.inputRef<Prisma.PostCreateOrConnectWithoutCommentsInput>('PostCreateOrConnectWithoutCommentsInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":PostWhereUniqueInput}),
    create: t.field({"required":true,"type":PostCreateWithoutCommentsInput}),
  }),
});

export const UserUpsertWithoutCommentsInput = builder.inputRef<Prisma.UserUpsertWithoutCommentsInput>('UserUpsertWithoutCommentsInput').implement({
  fields: (t) => ({
    update: t.field({"required":true,"type":UserUpdateWithoutCommentsInput}),
    create: t.field({"required":true,"type":UserCreateWithoutCommentsInput}),
  }),
});

export const UserUpdateWithoutCommentsInput = builder.inputRef<Prisma.UserUpdateWithoutCommentsInput>('UserUpdateWithoutCommentsInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
    Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
    Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
    Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const PostUpsertWithoutCommentsInput = builder.inputRef<Prisma.PostUpsertWithoutCommentsInput>('PostUpsertWithoutCommentsInput').implement({
  fields: (t) => ({
    update: t.field({"required":true,"type":PostUpdateWithoutCommentsInput}),
    create: t.field({"required":true,"type":PostCreateWithoutCommentsInput}),
  }),
});

export const PostUpdateWithoutCommentsInput = builder.inputRef<Prisma.PostUpdateWithoutCommentsInput>('PostUpdateWithoutCommentsInput').implement({
  fields: (t) => ({
    title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
  }),
});

export const UserCreateWithoutProfileInput = builder.inputRef<Prisma.UserCreateWithoutProfileInput>('UserCreateWithoutProfileInput').implement({
  fields: (t) => ({
    firstName: t.string({"required":true}),
    lastName: t.string({"required":true}),
    birthdate: t.field({"required":true,"type":DateTime}),
    login: t.string({"required":true}),
    Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
    Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
    Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserCreateOrConnectWithoutProfileInput = builder.inputRef<Prisma.UserCreateOrConnectWithoutProfileInput>('UserCreateOrConnectWithoutProfileInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":UserWhereUniqueInput}),
    create: t.field({"required":true,"type":UserCreateWithoutProfileInput}),
  }),
});

export const UserUpsertWithoutProfileInput = builder.inputRef<Prisma.UserUpsertWithoutProfileInput>('UserUpsertWithoutProfileInput').implement({
  fields: (t) => ({
    update: t.field({"required":true,"type":UserUpdateWithoutProfileInput}),
    create: t.field({"required":true,"type":UserCreateWithoutProfileInput}),
  }),
});

export const UserUpdateWithoutProfileInput = builder.inputRef<Prisma.UserUpdateWithoutProfileInput>('UserUpdateWithoutProfileInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
    Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
    Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserCreateWithoutFollowingInput = builder.inputRef<Prisma.UserCreateWithoutFollowingInput>('UserCreateWithoutFollowingInput').implement({
  fields: (t) => ({
    firstName: t.string({"required":true}),
    lastName: t.string({"required":true}),
    birthdate: t.field({"required":true,"type":DateTime}),
    login: t.string({"required":true}),
    Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
    Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
    Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserCreateOrConnectWithoutFollowingInput = builder.inputRef<Prisma.UserCreateOrConnectWithoutFollowingInput>('UserCreateOrConnectWithoutFollowingInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":UserWhereUniqueInput}),
    create: t.field({"required":true,"type":UserCreateWithoutFollowingInput}),
  }),
});

export const UserCreateWithoutFollowersInput = builder.inputRef<Prisma.UserCreateWithoutFollowersInput>('UserCreateWithoutFollowersInput').implement({
  fields: (t) => ({
    firstName: t.string({"required":true}),
    lastName: t.string({"required":true}),
    birthdate: t.field({"required":true,"type":DateTime}),
    login: t.string({"required":true}),
    Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
    Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
    Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
    Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserCreateOrConnectWithoutFollowersInput = builder.inputRef<Prisma.UserCreateOrConnectWithoutFollowersInput>('UserCreateOrConnectWithoutFollowersInput').implement({
  fields: (t) => ({
    where: t.field({"required":true,"type":UserWhereUniqueInput}),
    create: t.field({"required":true,"type":UserCreateWithoutFollowersInput}),
  }),
});

export const UserUpsertWithoutFollowingInput = builder.inputRef<Prisma.UserUpsertWithoutFollowingInput>('UserUpsertWithoutFollowingInput').implement({
  fields: (t) => ({
    update: t.field({"required":true,"type":UserUpdateWithoutFollowingInput}),
    create: t.field({"required":true,"type":UserCreateWithoutFollowingInput}),
  }),
});

export const UserUpdateWithoutFollowingInput = builder.inputRef<Prisma.UserUpdateWithoutFollowingInput>('UserUpdateWithoutFollowingInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
    Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
    Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const UserUpsertWithoutFollowersInput = builder.inputRef<Prisma.UserUpsertWithoutFollowersInput>('UserUpsertWithoutFollowersInput').implement({
  fields: (t) => ({
    update: t.field({"required":true,"type":UserUpdateWithoutFollowersInput}),
    create: t.field({"required":true,"type":UserCreateWithoutFollowersInput}),
  }),
});

export const UserUpdateWithoutFollowersInput = builder.inputRef<Prisma.UserUpdateWithoutFollowersInput>('UserUpdateWithoutFollowersInput').implement({
  fields: (t) => ({
    firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
    login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
    Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
    Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
    // 'password' was omitted by @Pothos.omit found in schema comment
    // 'createdAt' was omitted by @Pothos.omit found in schema comment
    // 'updatedAt' was omitted by @Pothos.omit found in schema comment
  }),
});

export const PostUpdateWithoutAuthorInput = builder.inputRef<Prisma.PostUpdateWithoutAuthorInput>('PostUpdateWithoutAuthorInput').implement({
  fields: (t) => ({
    title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Comments: t.field({"required":false,"type":CommentUpdateManyWithoutPostNestedInput}),
  }),
});

export const CommentUpdateWithoutAuthorInput = builder.inputRef<Prisma.CommentUpdateWithoutAuthorInput>('CommentUpdateWithoutAuthorInput').implement({
  fields: (t) => ({
    comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Post: t.field({"required":false,"type":PostUpdateOneRequiredWithoutCommentsNestedInput}),
  }),
});

export const ProfileUpdateWithoutUserInput = builder.inputRef<Prisma.ProfileUpdateWithoutUserInput>('ProfileUpdateWithoutUserInput').implement({
  fields: (t) => ({
    bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  }),
});

export const FollowUpdateWithoutToInput = builder.inputRef<Prisma.FollowUpdateWithoutToInput>('FollowUpdateWithoutToInput').implement({
  fields: (t) => ({
    From: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowingNestedInput}),
  }),
});

export const FollowUpdateWithoutFromInput = builder.inputRef<Prisma.FollowUpdateWithoutFromInput>('FollowUpdateWithoutFromInput').implement({
  fields: (t) => ({
    To: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowersNestedInput}),
  }),
});

export const CommentUpdateWithoutPostInput = builder.inputRef<Prisma.CommentUpdateWithoutPostInput>('CommentUpdateWithoutPostInput').implement({
  fields: (t) => ({
    comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
    Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutCommentsNestedInput}),
  }),
});