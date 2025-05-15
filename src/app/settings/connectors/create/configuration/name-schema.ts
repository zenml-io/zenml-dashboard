import { useMemo, useRef } from "react";
import { z } from "zod";
import { validateConnectorName } from "./debounced-check";
import { connectorConfigurationSchema } from "./schema";

export function useNameSchema(defaultValue: string) {
	const previousName = useRef(defaultValue);
	const previousValue = useRef(true);

	const nameSchema = useMemo(() => {
		return z.object({
			name: z
				.string()
				.trim()
				.min(1, "Name is required")
				.max(32, "Name can be at most 32 characters")
				.regex(/^[a-zA-Z0-9-]+$/, "Name can only contain letters, numbers and dashes")
				.refine(
					async (name) => {
						if (!name) return true;
						if (name !== previousName.current) {
							previousName.current = name;
							const result = await validateConnectorName(name);
							previousValue.current = result;
							return result;
						}
						return previousValue.current;
					},
					{ message: "Service connector with this name already exists" }
				)
		});
	}, []);

	return connectorConfigurationSchema.merge(nameSchema);
}
