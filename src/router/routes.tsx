export const routes = {
	home: "/",
	activateServer: "/activate-server",
	activateUser: "/activate-user",
	login: "/login",
	survey: "/survey",
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
	components: {
		overview: "/components"
	},
	stacks: {
		overview: "/stacks",
		create: {
			index: "/stacks/create",
			newInfra: "/stacks/create/new-infrastructure",
			manual: "/stacks/create/manual",
			existingInfra: "/stacks/create/existing-infrastructure",
			terraform: "/stacks/create/terraform"
		}
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
		secrets: { overview: "/settings/secrets", detail: (id: string) => `/settings/secrets/${id}` },
		connectors: { overview: "/settings/connectors" }
	}
};
