import { routes } from "@/router/routes";
import { User, UserMetadata } from "@/types/user";

export function getUsername(user: User) {
	return user.body?.full_name || user.name;
}

export function getActivationToken(user: User) {
	return `${window.location.origin}${routes.activateUser}?user=${user.id}&token=${user.body?.activation_token}`;
}

export function checkUserOnboarding(user: User) {
	if (user.body?.email_opted_in === null) return true;
	if ((user.metadata?.user_metadata as UserMetadata)?.finished_onboarding_survey) return true;
	// old versions need to check for awareness_channels
	if (
		!(user.metadata?.user_metadata as { awareness_channels?: string[] })?.awareness_channels?.length
	)
		return true;

	return false;
}
