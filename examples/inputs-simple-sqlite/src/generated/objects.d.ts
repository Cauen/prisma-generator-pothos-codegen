import type { Prisma, User, Post, ExtraModal, Comment, Profile, Follow, Unrelated, IdOnly, WithoutID, WithScalars } from ".prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "Posts" | "Comments" | "Profile" | "Followers" | "Following";
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
        Where: Prisma.PostWhereUniqueInput;
        Fields: "Author" | "Comments";
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
        Where: Prisma.ExtraModalWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        Where: Prisma.CommentWhereUniqueInput;
        Fields: "Author" | "Post";
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
        Where: Prisma.ProfileWhereUniqueInput;
        Fields: "User";
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
        Where: Prisma.FollowWhereUniqueInput;
        Fields: "From" | "To";
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
        Where: Prisma.UnrelatedWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    IdOnly: {
        Name: "IdOnly";
        Shape: IdOnly;
        Include: never;
        Select: Prisma.IdOnlySelect;
        Where: Prisma.IdOnlyWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    WithoutID: {
        Name: "WithoutID";
        Shape: WithoutID;
        Include: never;
        Select: Prisma.WithoutIDSelect;
        Where: Prisma.WithoutIDWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    WithScalars: {
        Name: "WithScalars";
        Shape: WithScalars;
        Include: never;
        Select: Prisma.WithScalarsSelect;
        Where: Prisma.WithScalarsWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}