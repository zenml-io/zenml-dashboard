import { User } from "@/types/user";

export function getUsername(user: User) {
	return user.body?.full_name || user.name;
}

export function getActivationToken(user: User) {
	return `${window.location.origin}/signup?user=${user.id}&username=${encodeURIComponent(user.name)}&token=${user.body?.activation_token}`;
}

export function getIsDefaultUser(user: User) {
	return user.name === "default";
}
