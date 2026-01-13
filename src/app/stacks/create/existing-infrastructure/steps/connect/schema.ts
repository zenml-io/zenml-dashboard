import { z } from "zod";
import { stackNameSchema } from "../../../components/sharedSchema";

export const newConnectorBaseSchema = z.object({
	authMethod: z.string().min(1),
	stackName: stackNameSchema()
});

export type NewConnectorBaseForm = z.infer<typeof newConnectorBaseSchema>;
