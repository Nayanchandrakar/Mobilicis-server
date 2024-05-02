import db from "../lib/db";
import type { AuditType } from "@prisma/client";

interface auditLogType {
  type: AuditType;
  userId: string;
  userAgent: string;
}

export const createAuditLog = async ({
  type,
  userAgent,
  userId,
}: auditLogType) => {
  try {
    const auditLog = await db?.auditLog?.create({
      data: {
        type,
        userAgent,
        userId,
      },
    });

    return auditLog;
  } catch (error) {
    return null;
  }
};
