import { z } from "zod";

export const orchestratorFormBaseSchema = z.object({
	flavor: z.string().min(1),
	resourceId: z.string().min(1)
});

export type OrchestratorForm = z.infer<typeof orchestratorFormBaseSchema>;
