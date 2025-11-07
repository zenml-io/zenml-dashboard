import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [svgr(), react()],
	base: "./",
	resolve: {
		alias: {
			"@": "/src"
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"monaco-editor": ["@monaco-editor/react", "monaco-editor"],
					"react-vendor": ["react", "react-dom"],
					markdown: ["react-markdown", "remark-gfm"]
				}
			}
		},
		chunkSizeWarningLimit: 1000
	}
});
