import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import prefetchPlugin from "vite-plugin-bundle-prefetch";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react(), prefetchPlugin()],
	resolve: {
		alias: {
			"@": "/src"
		}
	}
});
