import { User, UserMetadata } from "@/types/user";
import { routes } from "@/router/routes";

export function getUsername(user: User) {
	return user.body?.full_name || user.name;
}

export function getActivationToken(user: User) {
	return `${window.location.origin}${routes.activate}?user=${user.id}&token=${user.body?.activation_token}`;
}

export function checkUserOnboarding(user: User) {
	if (user.body?.email_opted_in === null) return true;
	if (!(user.metadata?.metadata as UserMetadata)?.awareness_channels?.length) return true;

	return false;
}
