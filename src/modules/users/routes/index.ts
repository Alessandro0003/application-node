import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controller from "../controllers/index.ts";
import { createUser } from "../controllers/schema.ts";

export const usersRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get("/", () => {
		return { message: "List all users" };
	});
	route.post("/", { schema: createUser }, controller.createUser);
};
