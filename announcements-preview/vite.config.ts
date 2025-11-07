import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [svgr(), react()],
	resolve: {
		alias: {
			"@": "/src"
		}
	}
});
