import { UserRoleType } from "@/types/user-role";

export interface userInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  jwtToken: string;
  emailVerified: Date;
  role: UserRoleType;
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
