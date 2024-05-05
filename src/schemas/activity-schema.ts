import * as z from "zod";

export const deleteActivitySchema = z.object({
  id: z.string().min(6),
});

export type deleteActivitySchemaType = z.infer<typeof deleteActivitySchema>;
