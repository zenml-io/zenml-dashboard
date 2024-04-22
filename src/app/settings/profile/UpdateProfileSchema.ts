import { z } from "zod";

export const UpdateProfileFormSchema = z
	.object({
		fullName: z.union([z.string(), z.literal("")]),
		username: z.union([z.string(), z.literal("")]),
		email: z.union([z.string().email(), z.literal("")])
	})
	.refine((data) => {
		return data.fullName !== "" || data.username !== "" || data.email !== "";
	});

export type UpdateProfileForm = z.infer<typeof UpdateProfileFormSchema>;
