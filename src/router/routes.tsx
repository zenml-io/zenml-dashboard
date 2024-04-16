export const routes = {
	home: "/",
	login: "/login",
	devices: {
		verify: "/devices/verify"
	},
	models: {
		overview: "/models"
	},
	artifacts: {
		overview: "/artifacts"
	},
	pipelines: {
		overview: "/pipelines",
		namespace: (namespace: string) => `/pipelines/${namespace}`
	},
	stacks: {
		overview: "/stacks"
	},
	runs: {
		detail: (id: string) => `/runs/${id}`
	}
};
