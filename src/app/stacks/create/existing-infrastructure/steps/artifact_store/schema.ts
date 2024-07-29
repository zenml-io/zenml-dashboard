import { z } from "zod";

export const artifactStoreSchema = z.object({
	resourceId: z.string().min(1),
	flavor: z.string()
});

export type ArtifactStoreForm = z.infer<typeof artifactStoreSchema>;
