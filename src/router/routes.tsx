export const routes = {
	home: "/",
	login: "/login",
	survey: "/survey",
	activate: "/activate",
	onboarding: "/onboarding",
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
		general: "/settings/general",
		members: `/settings/members`,
		notifications: "/settings/notifications",
		repositories: { overview: "/settings/repositories" },
		profile: `/settings/profile`,
		secrets: { overview: "/settings/secrets" },
		connectors: { overview: "/settings/connectors" }
	}
};
