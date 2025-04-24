import { validateStackName } from "@/lib/stacks";
import { z } from "zod";

export const stackNameSchema = z
	.string()
	.trim()
	.min(1, "Stack name is required")
	.max(255, "Stack name must be less than 255 characters")
	.refine((name) => validateStackName(name), "Stack name is already in use");
