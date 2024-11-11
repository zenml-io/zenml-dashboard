import { z } from "zod";

export const upgradeFormSchema = z.object({
	name: z.string().min(1),
	company: z.string().min(1),
	email: z.string().email()
});

export type UpgradeForm = z.infer<typeof upgradeFormSchema>;
