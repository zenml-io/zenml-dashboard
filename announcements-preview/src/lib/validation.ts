import { announcementListSchema } from "./schema";
import { z } from "zod";

export type ValidationResult =
	| { success: true; data: z.infer<typeof announcementListSchema> }
	| { success: false; error: z.ZodError };

export function validateAnnouncements(json: unknown): ValidationResult {
	const result = announcementListSchema.safeParse(json);
	if (result.success) {
		return { success: true, data: result.data };
	}
	return { success: false, error: result.error };
}
