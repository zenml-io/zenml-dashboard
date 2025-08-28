"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Skeleton, Box, ScrollArea } from "@zenml-io/react-component-library";
import { usePipelineEndpoint, useChatWithPipeline } from "@/data/pipeline-endpoints";
import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/router/routes";
import User from "@/assets/icons/user.svg?react";
import Bot from "@/assets/icons/robot.svg?react";
import Send from "@/assets/icons/arrow-right.svg?react";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import MessageCircle from "@/assets/icons/message-chat-square.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import RefreshCw from "@/assets/icons/refresh.svg?react";
import Sparkles from "@/assets/icons/stars.svg?react";

interface ChatMessage {
	role: "user" | "assistant";
	content: string;
	timestamp: string;
}

export default function PipelineEndpointChatPage() {
	const { endpointId } = useParams<{ endpointId: string }>();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const chatMutation = useChatWithPipeline();

	const { data: endpoint, isLoading } = usePipelineEndpoint(endpointId!);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = async (messageContent?: string) => {
		const content = messageContent || input.trim();
		if (!content || !endpointId || isStreaming) return;

		const userMessage: ChatMessage = {
			role: "user",
			content: content,
			timestamp: new Date().toISOString()
		};

		// Update messages state and capture current history including the new user message
		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);
		setInput("");
		setIsStreaming(true);

		try {
			const assistantMessage: ChatMessage = {
				role: "assistant",
				content: "",
				timestamp: new Date().toISOString()
			};

			setMessages((prev) => [...prev, assistantMessage]);

			await chatMutation.mutateAsync({
				endpointId,
				message: userMessage.content,
				// Fix: Send complete history including current user message
				history: updatedMessages,
				onChunk: (chunk: string) => {
					assistantMessage.content += chunk;
					setMessages((prev) =>
						prev.map((msg, index) => (index === prev.length - 1 ? { ...assistantMessage } : msg))
					);
				}
			});
		} catch (error) {
			console.error("Chat error:", error);
			// Add error message
			const errorMessage: ChatMessage = {
				role: "assistant",
				content: "Sorry, there was an error processing your message. Please try again.",
				timestamp: new Date().toISOString()
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsStreaming(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			sendMessage();
		}
	};

	const navigate = useNavigate();

	if (isLoading) {
		return (
			<div className="layout-container space-y-6 py-5">
				<Skeleton className="w-96 h-10" />
				<Skeleton className="rounded-lg h-[700px] w-full" />
			</div>
		);
	}

	if (!endpoint) {
		return (
			<div className="layout-container space-y-6 py-5">
				<Box className="p-8 text-center">
					<AlertCircle className="fill-theme-error-moderate mx-auto mb-4 h-12 w-12" />
					<h2 className="text-display-xs font-semibold text-theme-text-primary">
						Endpoint not found
					</h2>
					<p className="mt-2 text-theme-text-secondary">
						The requested pipeline endpoint could not be found.
					</p>
					<Button
						onClick={() => navigate(routes.projects.pipelineEndpoints.overview)}
						className="mt-4 rounded-md"
					>
						Back to Endpoints
					</Button>
				</Box>
			</div>
		);
	}

	return (
		<div className="layout-container space-y-6 py-5">
			{/* Breadcrumb Navigation */}
			<nav className="text-sm flex items-center gap-2">
				<Link
					to="/projects"
					className="text-theme-text-tertiary transition-colors hover:text-theme-text-primary"
				>
					Projects
				</Link>
				<ChevronRight className="h-4 w-4 fill-theme-text-tertiary" />
				<Link
					to={routes.projects.pipelineEndpoints.overview}
					className="text-theme-text-tertiary transition-colors hover:text-theme-text-primary"
				>
					Pipeline Endpoints
				</Link>
				<ChevronRight className="h-4 w-4 fill-theme-text-tertiary" />
				<Link
					to={routes.projects.pipelineEndpoints.detail(endpointId!)}
					className="text-theme-text-tertiary transition-colors hover:text-theme-text-primary"
				>
					{endpoint.name}
				</Link>
				<ChevronRight className="h-4 w-4 fill-theme-text-tertiary" />
				<span className="font-medium text-theme-text-primary">Chat Interface</span>
			</nav>

			{/* Header */}
			<PageHeader className="border-b border-neutral-200 pb-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-3 shadow-lg shadow-primary-500/20">
							<MessageCircle className="h-7 w-7 fill-white" />
						</div>
						<div>
							<h1 className="text-display-xs font-semibold text-neutral-900">AI Chat Interface</h1>
							<p className="mt-1 text-text-md text-neutral-600">
								Conversing with{" "}
								<span className="font-semibold text-primary-600">{endpoint.name}</span>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						{/* Model Info */}
						<div className="py-1.5 rounded-lg border border-neutral-200 bg-neutral-100 px-3">
							<span className="text-xs text-neutral-600">Model: </span>
							<span className="text-xs font-semibold text-neutral-900">
								{endpoint.resources?.pipeline_deployment?.id || "Unknown"}
							</span>
						</div>
						{/* Connection Status */}
						{endpoint.body.status === "running" ? (
							<div className="py-1.5 rounded-full flex items-center gap-2 border border-green-200 bg-green-50 px-3">
								<span className="rounded-full h-2 w-2 animate-pulse bg-green-500" />
								<span className="text-sm font-semibold text-green-700">Connected</span>
							</div>
						) : (
							<div className="py-1.5 rounded-full flex items-center gap-2 border border-red-200 bg-red-50 px-3">
								<span className="rounded-full h-2 w-2 bg-red-500" />
								<span className="text-sm font-semibold text-red-700">Disconnected</span>
							</div>
						)}
					</div>
				</div>
			</PageHeader>

			{/* Chat Container */}
			<Box className="rounded-2xl flex h-[750px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-2xl">
				{/* Messages Area */}
				<ScrollArea className="flex-1 bg-gradient-to-b from-neutral-50 to-white px-4 py-6">
					{messages.length === 0 && (
						<div className="flex h-full flex-col items-center justify-center text-center">
							<div className="rounded-2xl mb-6 bg-gradient-to-br from-primary-100 to-primary-50 p-6 shadow-lg shadow-primary-100/50">
								<Sparkles className="w-16 h-16 fill-primary-600" />
							</div>
							<h3 className="text-2xl mb-3 font-bold text-neutral-900">Welcome to AI Chat</h3>
							<p className="mb-8 max-w-lg text-neutral-600">
								Start a conversation with your AI pipeline. Ask questions, get insights, or explore
								capabilities.
							</p>
							<div className="grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
								<button
									onClick={() => sendMessage("What can you help me with?")}
									className="rounded-xl group border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:bg-neutral-50"
								>
									<p className="text-sm font-medium text-neutral-900 group-hover:text-primary-600">
										💡 "What can you help me with?"
									</p>
								</button>
								<button
									onClick={() => sendMessage("Analyze my latest data")}
									className="rounded-xl group border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:bg-neutral-50"
								>
									<p className="text-sm font-medium text-neutral-900 group-hover:text-primary-600">
										🔍 "Analyze my latest data"
									</p>
								</button>
								<button
									onClick={() => sendMessage("Generate a report")}
									className="rounded-xl group border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:bg-neutral-50"
								>
									<p className="text-sm font-medium text-neutral-900 group-hover:text-primary-600">
										📊 "Generate a report"
									</p>
								</button>
								<button
									onClick={() => sendMessage("Explain your configuration")}
									className="rounded-xl group border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:bg-neutral-50"
								>
									<p className="text-sm font-medium text-neutral-900 group-hover:text-primary-600">
										⚙️ "Explain your configuration"
									</p>
								</button>
							</div>
						</div>
					)}

					<div className="mx-auto max-w-4xl space-y-6">
						{messages.map((message, index) => (
							<div
								key={index}
								className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								{message.role === "assistant" && (
									<div className="flex-shrink-0">
										<div className="rounded-xl flex h-10 w-10 items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20">
											<Bot className="h-6 w-6 fill-white" />
										</div>
									</div>
								)}

								<div className={`group relative max-w-[80%]`}>
									<div
										className={`${
											message.role === "user"
												? "bg-gradient-to-br from-neutral-800 to-neutral-900 text-white"
												: "border border-neutral-200 bg-white text-neutral-900"
										} rounded-2xl px-5 py-4 shadow-lg`}
									>
										<div className="whitespace-pre-wrap text-[15px] leading-relaxed">
											{message.content}
										</div>
										{message.role === "assistant" && (
											<div className="mt-3 flex items-center gap-2 border-t border-neutral-200 pt-3">
												<button className="p-1.5 rounded-lg group/btn transition-colors hover:bg-neutral-100">
													<Copy className="h-4 w-4 fill-neutral-400 group-hover/btn:fill-neutral-600" />
												</button>
												<button className="p-1.5 rounded-lg group/btn transition-colors hover:bg-neutral-100">
													<RefreshCw className="h-4 w-4 fill-neutral-400 group-hover/btn:fill-neutral-600" />
												</button>
												<span className="text-xs ml-auto text-neutral-400">
													{new Date(message.timestamp).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit"
													})}
												</span>
											</div>
										)}
										{message.role === "user" && (
											<div className="text-xs mt-2 text-white/60">
												{new Date(message.timestamp).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})}
											</div>
										)}
									</div>
								</div>

								{message.role === "user" && (
									<div className="flex-shrink-0">
										<div className="rounded-xl flex h-10 w-10 items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-lg">
											<User className="h-6 w-6 fill-white" />
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{isStreaming && (
						<div className="mx-auto flex max-w-4xl justify-start gap-4">
							<div className="flex-shrink-0">
								<div className="rounded-xl flex h-10 w-10 items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20">
									<Bot className="h-6 w-6 fill-white" />
								</div>
							</div>
							<div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-lg">
								<div className="flex items-center gap-2">
									<div className="rounded-full h-2 w-2 animate-pulse bg-primary-500" />
									<div
										className="rounded-full h-2 w-2 animate-pulse bg-primary-500"
										style={{ animationDelay: "0.2s" }}
									/>
									<div
										className="rounded-full h-2 w-2 animate-pulse bg-primary-500"
										style={{ animationDelay: "0.4s" }}
									/>
									<span className="text-sm ml-2 text-neutral-600">AI is thinking...</span>
								</div>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</ScrollArea>

				{/* Input Area */}
				<div className="border-t border-neutral-200 bg-gradient-to-b from-white to-neutral-50 px-6 py-5">
					<div className="mx-auto max-w-4xl">
						<div className="flex items-end gap-4">
							<div className="relative flex-1">
								<textarea
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Message AI assistant..."
									className="py-3.5 rounded-2xl w-full resize-none border border-neutral-200 bg-white px-5 pr-12 text-[15px] leading-relaxed text-neutral-900 shadow-sm transition-all placeholder:text-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
									rows={1}
									style={{ minHeight: "52px", maxHeight: "150px" }}
									disabled={isStreaming || endpoint.body.status !== "running"}
								/>
								<div className="absolute bottom-2 right-2 flex items-center gap-1">
									<button
										className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
										title="Add attachment"
									>
										<svg
											className="h-5 w-5 fill-neutral-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									<button
										className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
										title="Voice input"
									>
										<svg
											className="h-5 w-5 fill-neutral-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
							</div>
							<Button
								onClick={() => sendMessage()}
								disabled={isStreaming || !input.trim() || endpoint.body.status !== "running"}
								intent="primary"
								size="lg"
								className="gap-2 rounded-md px-6"
							>
								{isStreaming ? (
									<>
										<div className="rounded-full h-4 w-4 animate-spin border-2 border-white/30 border-t-white" />
										<span className="font-semibold">Sending</span>
									</>
								) : (
									<>
										<Send className="h-4 w-4 fill-white" />
										<span className="font-semibold">Send</span>
									</>
								)}
							</Button>
						</div>

						{endpoint.body.status !== "running" ? (
							<div className="rounded-xl mt-4 flex items-start gap-3 border border-amber-200 bg-amber-50 p-3">
								<div className="rounded-lg bg-amber-100 p-1">
									<AlertCircle className="h-4 w-4 fill-amber-600" />
								</div>
								<p className="text-sm text-amber-800">
									Pipeline endpoint is not running. Start the endpoint to enable chat functionality.
								</p>
							</div>
						) : (
							<div className="text-xs mt-4 flex items-center justify-between text-neutral-500">
								<div className="flex items-center gap-4">
									<span>⌘ + Enter to send</span>
									<span>⇧ + Enter for new line</span>
								</div>
								<div className="flex items-center gap-2">
									<span>Powered by</span>
									<span className="font-semibold text-primary-600">{endpoint.name}</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</Box>
		</div>
	);
}
