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
			overview: "/projects/default/runs",
			detail: (id: string) => `/projects/default/runs/${id}`
		},
		pipelines: {
			overview: "/projects/default/pipelines",
			detail: {
				runs: (pipelineId: string) => `/projects/default/pipelines/${pipelineId}/runs`,
				snapshots: (pipelineId: string) => `/projects/default/pipelines/${pipelineId}/snapshots`,
				deployments: (pipelineId: string) => `/projects/default/pipelines/${pipelineId}/deployments`
			}
		},
		snapshots: {
			overview: "/projects/default/snapshots",
			detail: {
				overview: (snapshotId: string) => `/projects/default/snapshots/${snapshotId}`,
				runs: (snapshotId: string) => `/projects/default/snapshots/${snapshotId}/runs`
			}
		},
		deployments: {
			detail: {
				overview: (deploymentId: string) => `/projects/default/deployments/${deploymentId}`
			}
		},
		models: {
			overview: "/projects/default/models"
		},
		artifacts: {
			overview: "/projects/default/artifacts"
		},
		settings: {
			repositories: { overview: "/projects/default/settings/repositories" },
			profile: "/projects/default/settings/profile"
		}
	},
	settings: {
		apiTokens: "/settings/api-tokens",
		general: "/settings/general",
		members: `/settings/members`,
		notifications: "/settings/notifications",
		profile: `/settings/profile`,
		secrets: { overview: "/settings/secrets", detail: (id: string) => `/settings/secrets/${id}` },
		connectors: {
			overview: "/settings/connectors",
			create: "/settings/connectors/create",
			detail: {
				configuration: (id: string) => `/settings/connectors/${id}/configuration`,
				components: (id: string) => `/settings/connectors/${id}/components`,
				resources: (id: string) => `/settings/connectors/${id}/resources`
			}
		},
		service_accounts: {
			overview: "/settings/service-accounts",
			detail: (id: string) => `/settings/service-accounts/${id}`
		}
	}
};
