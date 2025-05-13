export const routes = {
	home: "/",
	activateServer: "/activate-server",
	activateUser: "/activate-user",
	login: "/login",
	upgrade: "/upgrade",
	survey: "/survey",
	onboarding: "/onboarding",
	devices: {
		verify: "/devices/verify"
	},

	components: {
		overview: "/components",
		detail: (componentId: string) => `/components/${componentId}`,
		edit: (componentId: string) => `/components/${componentId}/edit`,
		create: "/components/create"
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
	projects: {
		overview: "/projects",
		runs: {
			detail: (id: string) => `/runs/${id}`
		},
		pipelines: {
			overview: "projects/default/pipelines",
			namespace: (namespace: string) => `projects/default/pipelines/${namespace}`
		},
		models: {
			overview: "projects/default/models"
		},
		artifacts: {
			overview: "projects/default/artifacts"
		}
	},
	settings: {
		apiTokens: "/settings/api-tokens",
		general: "/settings/general",
		members: `/settings/members`,
		notifications: "/settings/notifications",
		repositories: { overview: "/settings/repositories" },
		profile: `/settings/profile`,
		secrets: { overview: "/settings/secrets", detail: (id: string) => `/settings/secrets/${id}` },
		connectors: { overview: "/settings/connectors" },
		service_accounts: {
			overview: "/settings/service-accounts",
			detail: (id: string) => `/settings/service-accounts/${id}`
		}
	}
};
