import { Account, Comment, Proposal, User } from "@prisma/client";

export type AccountDto = Account & { user: User } | null;

export type UserDto = User | null;

export type ProposalDto = Proposal & { author: User } | null;
export type ProposalsDto = (Proposal & { author: User })[] | null;
export type ProposalDetailDto = Proposal & { author: User, comments: Comment[] } | null;

export type CommentDto = Comment & { author: User } | null;
export type CommentsDto = (Comment & { author: User })[] | null;
