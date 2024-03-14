/// <reference types="vitest" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./test/setup.ts",
		css: true,
		reporters: ["html"],
	},
})
