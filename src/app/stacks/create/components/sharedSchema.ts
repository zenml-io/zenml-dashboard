import { validateStackName } from "@/lib/stacks";
import { z } from "zod";

export const stackNameSchema = z
	.string()
	.trim()
	.min(1, "Stack name is required")
	.max(32, "Stack name must be less than 32 characters")
	.regex(/^[a-zA-Z0-9-]+$/, "Stack name can only contain alphanumeric characters and hyphens")
	.refine((name) => validateStackName(name), "Stack name is already in use");
