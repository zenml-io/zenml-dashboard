import { z } from "zod";

export const NotificationFormSchema = z.object({
	announcements: z.boolean(),
	updates: z.boolean()
});

export type NotificationFormType = z.infer<typeof NotificationFormSchema>;
