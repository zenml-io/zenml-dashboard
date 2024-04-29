import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import prefetchPlugin from "vite-plugin-bundle-prefetch";

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		exclude: ["legacy/**/*", "node_modules/**/*", "build/**/*", "dist/**/*", "e2e-tests/**/*"]
	},
	plugins: [svgr(), react(), prefetchPlugin()],
	resolve: {
		alias: {
			"@": "/src"
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					const chunk = splitChunks(id);
					if (chunk) {
						return chunk;
					}
				}
			}
		}
	}
});

function splitChunks(id: string) {
	if (id.includes("reactflow")) return "@reactflow";
	if (id.includes("radix")) return "@radix";
	if (id.includes("tanstack")) return "@tanstack";
	if (id.includes("react-router-dom") || id.includes("@remix-run") || id.includes("react-router")) {
		return "@react-router";
	}
}
