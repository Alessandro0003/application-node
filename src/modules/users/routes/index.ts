import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export const usersRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get("/", () => {
		return { message: "List all users" };
	});
	route.post("/", () => {
		return { message: "Create a new user" };
	});
};
