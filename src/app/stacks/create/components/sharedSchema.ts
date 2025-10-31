import { validateStackNameNotInUse } from "@/lib/stacks";
import { z } from "zod";

export const stackNameSchema = z
	.string()
	.trim()
	.min(1, "Stack name is required")
	.max(255, "Stack name must be less than 255 characters")
	.refine(
		(name) => name.match(/^[a-zA-Z0-9-]+$/),
		"Stack name can only contain only letters, numbers and dashes"
	)
	.refine((name) => validateStackNameNotInUse(name), "Stack name is already in use");
