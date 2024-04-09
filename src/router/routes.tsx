export const routes = {
	home: "/",
	login: "/login",
	devices: {
		verify: "/devices/verify"
	},
	pipelines: {
		overview: "/pipelines",
		namespace: (namespace: string) => `/pipelines/${namespace}`
	},
	runs: {
		detail: (id: string) => `/runs/${id}`
	}
};
