import { z } from "zod";
import { components } from "./core";

export type LoginResponse = components["schemas"]["OAuthTokenResponse"];

export const loginFormSchema = z.object({
	username: z.string().min(1),
	password: z.string().optional()
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
