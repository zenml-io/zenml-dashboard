import { z } from "zod";

export const connectorTypeSelectSchema = z.object({
	connectorType: z.string().trim().min(1)
});

export type ConnectorTypeSelectForm = z.infer<typeof connectorTypeSelectSchema>;
