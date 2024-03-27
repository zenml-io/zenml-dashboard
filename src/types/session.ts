import { z } from "zod";
import { components } from "./core";

export type LoginResponse = components["schemas"]["OAuthTokenResponse"];

export const LoginSchema = z.object({
	username: z.string(),
	password: z.string().optional()
});

export type LoginPayload = z.infer<typeof LoginSchema>;
