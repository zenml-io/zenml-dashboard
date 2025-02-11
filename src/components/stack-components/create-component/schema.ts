import { z } from "zod";

export const componentBaseSchema = z.object({
	componentName: z.string().min(1, "Component name is required"),
	connector: z.string()
});
