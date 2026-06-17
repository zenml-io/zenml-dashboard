import { routes } from "@/router/routes";
import { getUserMetadata } from "@/lib/user-metadata";
import { User } from "@/types/user";

export function getUsername(user: User) {
	return user.body?.full_name || user.name;
}

export function getActivationToken(user: User) {
	return `${window.location.origin}${routes.activateUser}?user=${user.id}&token=${user.body?.activation_token}`;
}

export function checkUserOnboarding(user: User) {
	if (user.body?.email_opted_in === null) return true;

	const metadata = getUserMetadata(user);

	if (metadata.finished_onboarding_survey) return false;
	// old versions need to check for awareness_channels
	if (!metadata.awareness_channels?.length) return true;

	return false;
}
