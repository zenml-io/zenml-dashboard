export const apiPaths = {
	currentUser: "/current-user",
	login: "/login",
	logout: "/logout"
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}