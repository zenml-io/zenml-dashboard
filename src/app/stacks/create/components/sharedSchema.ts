import { validateStackName } from "@/lib/stacks";
import { z } from "zod";

export const stackNameSchema = (currentName?: string) =>
	z
		.string()
		.trim()
		.min(1, "Stack name is required")
		.max(255, "Stack name must be less than 255 characters")
		.refine((name) => {
			if (currentName && name === currentName) return true;

			return validateStackName(name);
		}, "Stack name is already in use");
