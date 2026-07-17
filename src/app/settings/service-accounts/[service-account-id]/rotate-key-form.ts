import { RotateApi } from "@/types/service-accounts";
import { z } from "zod";

const optionalPositiveMinutes = z.union([
	z.coerce.number().int().min(1),
	z.literal("").transform(() => undefined),
	z.undefined()
]);

export const rotateFormSchema = z
	.object({
		enableRetention: z.boolean(),
		rotateMinutes: optionalPositiveMinutes
	})
	.refine(
		(data) => {
			if (data.enableRetention && !data.rotateMinutes) {
				return false;
			}
			return true;
		},
		{
			path: ["rotateMinutes"],
			message: "Enter a retention period in minutes."
		}
	);

export type RotateFormType = z.infer<typeof rotateFormSchema>;

export function buildRotateApiKeyRequest(data: RotateFormType): RotateApi {
	return {
		retain_period_minutes: data.enableRetention ? data.rotateMinutes : 0
	};
}
