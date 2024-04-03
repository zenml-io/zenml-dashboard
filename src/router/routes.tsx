export const routes = {
	home: "/",
	login: "/login",
	pipelines: {
		overview: "/pipelines",
		namespace: (namespace: string) => `/pipelines/${namespace}`
	}
};
