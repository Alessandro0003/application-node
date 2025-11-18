import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		fileParallelism: false,
		coverage: {
			enabled: true,
			reporter: ["text", "text-summary", "html"],
		},
	},
});
