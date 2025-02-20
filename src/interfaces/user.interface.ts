import { Role } from "@prisma/client";
import { IReview } from "./review.interface";

export interface IUser {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
  image: string;
  accounts: IAccount[];
  sessions: ISession[];
  reviews: IReview[];
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface IAccount {
  id: string;
  userId: string;
  providerType: string;
  providerId: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  accessTokenExpires?: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface ISession {
  id: string;
  sessionToken: string;
  userId: string;
  user: IUser;
  expires: string;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersFilterInput {
  search?: string;
  page?: number;
  limit?: number;
}
