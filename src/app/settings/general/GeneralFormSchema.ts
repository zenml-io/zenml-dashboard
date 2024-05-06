import { z } from "zod";

export const generalFormSchema = z.object({
	serverName: z.string().min(1)
});

export type GeneralFormType = z.infer<typeof generalFormSchema>;
