export const routes = {
	home: "/",
	login: "/login",
	pipelines: {
		overview: "/pipelines",
		namespace: (namespace: string) => `/pipelines/${namespace}`
	},
	runs: {
		detail: (id: string) => `/runs/${id}`
	},
	settings: {
		members: `/settings/members`,
		profile: `/settings/profile`
	}
};
