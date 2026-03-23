import { z } from "zod";

export const waitConditionFormSchema = z.object({
	result: z.string().optional()
});

export type WaitConditionFormValues = z.infer<typeof waitConditionFormSchema>;
