import { z } from "zod";

export const createPipelineSnapshotFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	pipeline: z.string().uuid("Invalid pipeline ID"),
	run: z.string().min(1, "Run is required")
});

export type CreatePipelineSnapshotFormSchema = z.infer<typeof createPipelineSnapshotFormSchema>;
