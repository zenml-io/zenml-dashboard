export const routes = {
	home: "/",
	login: "/login",
	survey: "/survey",
	signup: "/signup",
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
	},
	settings: {
		members: `/settings/members`,
		repositories: { overview: "/settings/repositories" },
		profile: `/settings/profile`,
		secrets: { overview: "/settings/secrets" },
		connectors: { overview: "/settings/connectors" }
	}
};
