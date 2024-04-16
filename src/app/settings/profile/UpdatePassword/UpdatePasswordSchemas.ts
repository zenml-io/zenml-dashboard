import { z } from "zod";

export const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

export const updatePasswordFormSchema = z
	.object({
		oldPassword: z.string(),
		newPassword: z.string().min(1),
		confirmPassword: z.string()
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match"
	});

export type UpdatePasswordForm = z.infer<typeof updatePasswordFormSchema>;