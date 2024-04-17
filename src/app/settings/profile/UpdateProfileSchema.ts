import { z } from "zod";

const UpdateProfileFormSchema = z.object({
	fullName: z.string(),
	username: z.string()
});

export type UpdateProfileForm = z.infer<typeof UpdateProfileFormSchema>;
