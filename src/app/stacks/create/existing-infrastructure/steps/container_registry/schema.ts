import { z } from "zod";

export const containerRegistrySchema = z.object({
	flavor: z.string().min(1),
	resourceId: z.string().min(1)
});

export type ContainerRegistryFormType = z.infer<typeof containerRegistrySchema>;
