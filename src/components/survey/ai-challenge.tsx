import Barchart from "@/assets/icons/bar-chart.svg?react";
import Eye from "@/assets/icons/eye.svg?react";
import Message from "@/assets/icons/message-chat-square.svg?react";
import Overlap from "@/assets/icons/overlap.svg?react";
import Robot from "@/assets/icons/robot.svg?react";
import Transformer from "@/assets/icons/transform.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@zenml-io/react-component-library";
import { clsx } from "clsx";
import { Controller, useForm } from "react-hook-form";
import { aiChallengesFormSchema, AiChallengesFormType } from "./form-schemas";

export type AiChallengesFormProps = {
	submitHandler: (data: AiChallengesFormType) => void;
};

const classNames = "h-5 w-5 fill-primary-400 shrink-0";

const types = [
	{
		key: "traditional_ml",
		name: "Traditional ML",
		icon: <Barchart className={classNames} />,
		description: "(sklearn, XGBoost, etc.)"
	},
	{
		key: "deep_learning",
		name: "Deep Learning",
		icon: <Transformer className={classNames} />,
		description: "(PyTorch, TensorFlow)"
	},
	{
		key: "computer_vision",
		name: "Computer Vision",
		icon: <Eye className={classNames} />,
		description: "(sklearn, XGBoost, etc.)"
	},
	{
		key: "llm_and_foundation_models",
		name: "LLMs / Foundation Models",
		icon: <Message className={classNames} />,
		description: "(OpenAI, Anthropic, etc.)"
	},
	{
		key: "ai_agents_and_workflows",
		name: "AI Agents / Agentic workflows",
		icon: <Robot className={classNames} />,
		description: "(LangChain, AutoGen, CrewAI, etc.)"
	},
	{
		key: "hybrid_applications",
		name: "Hybrid applications",
		icon: <Overlap className={classNames} />,
		description: "(ML + LLMs together)"
	}
] as const;

const challenges = [
	{
		name: "Prompt versioning and management",
		key: "prompt_versioning_and_management"
	},
	{
		name: "Ochestrating LLM workflows / agents",
		key: "orchestrating_llm_workflows_agents"
	},
	{
		name: "Evaluating LLM outputs systematically",
		key: "evaluating_llm_outputs_systematically"
	},
	{
		name: "Agent reliability and debugging",
		key: "agent_reliability_and_debugging"
	},
	{
		name: "Deploying agents",
		key: "deploying_agents"
	},
	{
		name: "Cost monitoring across providers",
		key: "cost_monitoring_across_providers"
	},
	{
		name: "Combining traditional ML with LLMs",
		key: "combining_traditional_ml_with_llms"
	},
	{
		name: "None of these are priorities yet",
		key: "none_of_these_are_priorities_yet"
	}
] as const;

export function AiChallengesForm({ submitHandler }: AiChallengesFormProps) {
	const {
		watch,
		handleSubmit,

		control,
		formState: { isValid }
	} = useForm<AiChallengesFormType>({
		resolver: zodResolver(aiChallengesFormSchema),
		defaultValues: { aiTypes: [] },
		shouldUnregister: true
	});
	const typeWatch = watch("aiTypes");
	const llmOrAgent =
		typeWatch.includes("llm_and_foundation_models") ||
		typeWatch.includes("ai_agents_and_workflows");

	return (
		<div className="flex flex-col justify-center gap-5 pb-5">
			<div className="w-fit self-center">
				<h1 className="text-display-xs font-semibold">What types of AI are you working with?</h1>
				<p className="text-left text-theme-text-secondary">
					This helps us recommend compatible frameworks and workflows
				</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div
					className={clsx("grid w-full grid-cols-1 gap-[20px] md:grid-cols-2 lg:min-w-[1050px]", {
						"opacity-60": llmOrAgent
					})}
				>
					<Controller
						control={control}
						name="aiTypes"
						render={({ field: { onChange, value } }) => (
							<>
								{types.map(({ description, icon, name, key }, i) => (
									<label
										key={i}
										className={clsx(
											"flex items-center gap-2 rounded-md border pl-3 transition-all duration-150",
											{
												"border-primary-400 bg-primary-25 shadow-sm":
													watch("aiTypes").includes(key),
												"border-theme-border-minimal bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
													!watch("aiTypes").includes(key)
											}
										)}
									>
										<Checkbox
											onCheckedChange={(val) => {
												if (val) {
													onChange([...value, key]);
												} else {
													onChange(value.filter((item) => item !== key));
												}
											}}
											value={key}
											className="h-3 w-3"
										/>
										<div className="flex w-full items-center gap-2 py-3 pr-3 hover:cursor-pointer">
											{icon}
											<div>
												<div className="font-semibold text-theme-text-primary">{name}</div>
												<div className="text-text-sm text-theme-text-secondary">{description}</div>
											</div>
										</div>
									</label>
								))}
							</>
						)}
					/>
				</div>
				{llmOrAgent && (
					<div id="biggest-challenge" className="w-full space-y-5">
						<h2 className="text-center text-display-xs font-semibold">
							What's your biggest challenge right now?
						</h2>
						<div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-2">
							<Controller
								control={control}
								name="biggestChallenge"
								render={({ field: { onChange, value } }) => (
									<>
										{challenges.map(({ name, key }, i) => (
											<label
												key={i}
												className={clsx(
													"flex items-center gap-2 rounded-md border pl-3 transition-all duration-150",
													{
														"border-primary-400 bg-primary-25 shadow-sm":
															watch("biggestChallenge")?.includes(key),
														"border-theme-border-minimal bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
															!watch("biggestChallenge")?.includes(key)
													}
												)}
											>
												<Checkbox
													onCheckedChange={(val) => {
														if (val) {
															onChange([...(value ?? []), key]);
														} else {
															onChange(value?.filter((item) => item !== key));
														}
													}}
													value={key}
													className="h-3 w-3"
												/>
												<div className="flex w-full items-center gap-2 py-3 pr-3 hover:cursor-pointer">
													{/* {icon} */}
													<div className="font-semibold text-theme-text-primary">{name}</div>
												</div>
											</label>
										))}
									</>
								)}
							/>
						</div>
					</div>
				)}

				<Button
					disabled={!isValid}
					type="submit"
					className="mx-auto w-full max-w-[520px] text-center"
					size="md"
				>
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
