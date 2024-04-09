import { Box } from "@zenml-io/react-component-library";
import MembersTable from "./MembersTable";
import { useAllMembers } from "@/data/tenants/tenants";

export default function MembersPage() {
	// const [members] = await Promise.all([useAllMembers("aaa55726-5040-41cc-8798-847baf4f3a0a", {})]);

	// const { data, refetch } = useAllMembers(
	// 	{
	// 		params: {
	// 			id: "aaa55726-5040-41cc-8798-847baf4f3a0a",
	// 			sort_by: "desc:updated"
	// 		}
	// 	},
	// 	{ throwOnError: true }
	// );

	const holi = [
		{
			name: "stefan",
			description: null,
			logo_url: null,
			id: "aaa55726-5040-41cc-8798-847baf4f3a0a",
			organization: {
				name: "DemoML",
				description: null,
				logo_url: null,
				id: "9cd5ee38-94f5-4f40-8c97-07feac4c3110",
				created: "2024-03-20T09:48:10.608260",
				updated: "2024-03-20T09:48:11.373910",
				owner: {
					name: "Alexej Penner",
					avatar_url:
						"https://lh3.googleusercontent.com/a/ACg8ocIWVSbtv0oSkaYBKXCoNLtnFn07lQKG5NiuGz2H4aXhmg=s96-c",
					company: null,
					job_title: null,
					metadata: {
						reason: ["Abstract ML infrastructure complexity", "Automate manual ML processes"],
						work_email: "alexej@zenml.io",
						primary_use: "work",
						models_production: "6-25"
					},
					email: "alexej@zenml.io",
					oauth_provider: "google-oauth2",
					oauth_id: "105983537700423015317",
					id: "38a16f5e-2c41-42f9-a501-20bffd15828f",
					is_active: true,
					is_superuser: false
				},
				has_active_subscription: true
			},
			owner: {
				name: "Stefan Nica",
				avatar_url: "https://avatars.githubusercontent.com/u/3963946?v=4",
				company: null,
				job_title: null,
				metadata: {
					reason: ["explore the galaxy"],
					work_email: "stefan@zenml.io",
					primary_use: "personal",
					models_production: "0"
				},
				email: "stefan@zenml.io",
				oauth_provider: "github",
				oauth_id: "3963946",
				id: "d16f9bb0-77ed-412f-98fc-5efe9f3f7b8f",
				is_active: true,
				is_superuser: false
			},
			zenml_service: {
				configuration: {
					version: "0.56.2",
					analytics_enabled: true,
					secrets_store: {
						type: "sql"
					},
					backup_secrets_store: null,
					admin: {
						helm_chart_version: null,
						image_repository: null,
						image_tag: "stefan",
						debug: null,
						rbac_implementation_source: null,
						workload_manager_implementation_source: null,
						feature_gate_implementation_source: null,
						environment_vars: null,
						secret_environment_vars: null,
						provider_type: null,
						provider_config: null,
						service_tier: null,
						resources: {
							replicas: 1,
							cpu: "250m",
							memory: "350Mi",
							autoscaling_enabled: false,
							min_replicas: null,
							max_replicas: null
						}
					}
				},
				status: {
					server_url: "https://9ba52960-zenml.staging.cloudinfra.zenml.io",
					username: null,
					password: null,
					version: "0.56.2"
				}
			},
			mlflow_service: null,
			usage_counts: {
				model: 3,
				pipeline: 7
			},
			instructions: {
				examples: [
					{
						name: "Run from your machine<",
						path: "Get Started",
						steps: [
							{
								command: "pip install zenml==0.56.2",
								description: "Install ZenML"
							},
							{
								command: "zenml integration install sklearn",
								description: "Install necessary requirements"
							},
							{
								command: "zenml connect --url https://9ba52960-zenml.staging.cloudinfra.zenml.io ",
								description: "Connect to ZenML cloud server"
							},
							{
								command:
									"git clone https://github.com/zenml-io/zenml.git --depth=1 && cd zenml/examples/quickstart",
								description: "Pull the quickstart"
							},
							{
								command: "zenml init",
								description: "Initialize ZenML"
							},
							{
								command: "zenml stack register --set quickstart -o default -a default",
								description: "Register your stack"
							},
							{
								command:
									"python run.py --feature-pipeline --training-pipeline --inference-pipeline",
								description: "Run the Quickstart"
							}
						]
					}
				]
			},
			desired_state: "available",
			status: "available",
			created: "2024-04-03T20:26:46.151083",
			updated: "2024-04-03T20:29:18.854851",
			status_updated: "2024-04-03T20:29:18.854851",
			services: {
				zenml: {
					metadata: {
						version: "0.56.2",
						server: "https://9ba52960-zenml.staging.cloudinfra.zenml.io",
						username: "",
						password: ""
					},
					status: "available"
				},
				stack: {
					metadata: {
						examples: [
							{
								name: "Run from your machine<",
								path: "Get Started",
								steps: [
									{
										command: "pip install zenml==0.56.2",
										description: "Install ZenML"
									},
									{
										command: "zenml integration install sklearn",
										description: "Install necessary requirements"
									},
									{
										command:
											"zenml connect --url https://9ba52960-zenml.staging.cloudinfra.zenml.io ",
										description: "Connect to ZenML cloud server"
									},
									{
										command:
											"git clone https://github.com/zenml-io/zenml.git --depth=1 && cd zenml/examples/quickstart",
										description: "Pull the quickstart"
									},
									{
										command: "zenml init",
										description: "Initialize ZenML"
									},
									{
										command: "zenml stack register --set quickstart -o default -a default",
										description: "Register your stack"
									},
									{
										command:
											"python run.py --feature-pipeline --training-pipeline --inference-pipeline",
										description: "Run the Quickstart"
									}
								]
							}
						]
					},
					status: "available"
				}
			}
		}
	];

	console.log("pp", holi);
	return (
		<Box className="flex flex-col gap-4 p-5">
			<h1 className="text-text-xl font-semibold">Tenant Members</h1>
			<MembersTable members={holi} />
		</Box>
	);
}
