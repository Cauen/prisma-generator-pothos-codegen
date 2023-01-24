/* eslint-disable */
import type { Prisma, User, Post, ExtraModal, Comment, Profile, Follow, Unrelated, IdOnly, WithoutID, WithScalars } from ".prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "Posts" | "Comments" | "Profile" | "Followers" | "Following";
        ListRelations: "Posts" | "Comments" | "Profile" | "Followers" | "Following";
        Relations: {
            Posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            Comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
            Profile: {
                Shape: Profile[];
                Types: PrismaTypes["Profile"];
            };
            Followers: {
                Shape: Follow[];
                Types: PrismaTypes["Follow"];
            };
            Following: {
                Shape: Follow[];
                Types: PrismaTypes["Follow"];
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        RelationName: "Author" | "Comments";
        ListRelations: "Comments";
        Relations: {
            Author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            Comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
        };
    };
    ExtraModal: {
        Name: "ExtraModal";
        Shape: ExtraModal;
        Include: never;
        Select: Prisma.ExtraModalSelect;
        OrderBy: Prisma.ExtraModalOrderByWithRelationInput;
        WhereUnique: Prisma.ExtraModalWhereUniqueInput;
        Where: Prisma.ExtraModalWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        RelationName: "Author" | "Post";
        ListRelations: never;
        Relations: {
            Author: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            Post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
        };
    };
    Profile: {
        Name: "Profile";
        Shape: Profile;
        Include: Prisma.ProfileInclude;
        Select: Prisma.ProfileSelect;
        OrderBy: Prisma.ProfileOrderByWithRelationInput;
        WhereUnique: Prisma.ProfileWhereUniqueInput;
        Where: Prisma.ProfileWhereInput;
        RelationName: "User";
        ListRelations: never;
        Relations: {
            User: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Follow: {
        Name: "Follow";
        Shape: Follow;
        Include: Prisma.FollowInclude;
        Select: Prisma.FollowSelect;
        OrderBy: Prisma.FollowOrderByWithRelationInput;
        WhereUnique: Prisma.FollowWhereUniqueInput;
        Where: Prisma.FollowWhereInput;
        RelationName: "From" | "To";
        ListRelations: never;
        Relations: {
            From: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            To: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Unrelated: {
        Name: "Unrelated";
        Shape: Unrelated;
        Include: never;
        Select: Prisma.UnrelatedSelect;
        OrderBy: Prisma.UnrelatedOrderByWithRelationInput;
        WhereUnique: Prisma.UnrelatedWhereUniqueInput;
        Where: Prisma.UnrelatedWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    IdOnly: {
        Name: "IdOnly";
        Shape: IdOnly;
        Include: never;
        Select: Prisma.IdOnlySelect;
        OrderBy: Prisma.IdOnlyOrderByWithRelationInput;
        WhereUnique: Prisma.IdOnlyWhereUniqueInput;
        Where: Prisma.IdOnlyWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    WithoutID: {
        Name: "WithoutID";
        Shape: WithoutID;
        Include: never;
        Select: Prisma.WithoutIDSelect;
        OrderBy: Prisma.WithoutIDOrderByWithRelationInput;
        WhereUnique: Prisma.WithoutIDWhereUniqueInput;
        Where: Prisma.WithoutIDWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    WithScalars: {
        Name: "WithScalars";
        Shape: WithScalars;
        Include: never;
        Select: Prisma.WithScalarsSelect;
        OrderBy: Prisma.WithScalarsOrderByWithRelationInput;
        WhereUnique: Prisma.WithScalarsWhereUniqueInput;
        Where: Prisma.WithScalarsWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}