import { z } from "zod";

// TODO We might want to refactor this to an AuthContext
const authStateSchema = z.boolean();
const authStateWriteSchema = z.enum(["true", "false"]);

const authStateKey = "isAuthenticated";

export function getAuthState() {
	console.log("executed");
	try {
		const authState = localStorage.getItem(authStateKey);
		if (authState === null) {
			return false;
		}
		return authStateSchema.parse(JSON.parse(authState));
	} catch (e) {
		return false;
	}
}

export function removeAuthState() {
	localStorage.removeItem(authStateKey);
}

export function setAuthState(value: z.infer<typeof authStateWriteSchema>) {
	localStorage.setItem(authStateKey, value);
}
