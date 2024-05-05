import { ActivitType, UserRoleType } from "@/types/user-role";

export interface userInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: Date;
  role: UserRoleType;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface sessionInterface {
  id: string;
  token: string;
  userAgent: string;
  status: boolean;
  timeStamp: Date;
  userId: string;
}

export interface activityInterface {
  id: string;
  type: ActivitType;
  userAgent: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
