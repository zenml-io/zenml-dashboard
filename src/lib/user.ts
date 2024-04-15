import { User } from "@/types/user";

export function getUsername(user: User) {
	return user.body?.full_name || user.name;
}
