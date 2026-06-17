import { UserMetadata, userMetadataSchema } from "@/types/user";

export function parseUserMetadata(value: unknown): UserMetadata {
	const result = userMetadataSchema.safeParse(value);
	return result.success ? result.data : {};
}

export function getUserMetadata(user: {
	metadata?: { user_metadata?: unknown } | null;
}): UserMetadata {
	return parseUserMetadata(user.metadata?.user_metadata);
}
