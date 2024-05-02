import { z } from "zod";

export const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[!@#$%^&*(),.?":{}|<>\/]/, "Password must contain at least one special character");

export const updatePasswordBaseFormSchema = z.object({
	oldPassword: z.string().optional(),
	newPassword: passwordSchema,
	confirmPassword: z.string().min(1)
});

export const updatePasswordFormSchema = updatePasswordBaseFormSchema.refine(
	(data) => data.newPassword === data.confirmPassword,
	{
		path: ["confirmPassword"],
		message: "Passwords do not match"
	}
);

export type UpdatePasswordFormType = z.infer<typeof updatePasswordFormSchema>;
