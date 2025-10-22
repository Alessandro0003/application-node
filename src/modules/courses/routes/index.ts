import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export const coursesRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get("/", () => {
		return { message: "List all courses" };
	});
	route.post("/", () => {
		return { message: "Create a new course" };
	});
};
