export const apiPaths = {
	login: "/login",
	logout: "/logout",
	currentUser: "/current-user"
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
