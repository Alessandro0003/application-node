import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controller from "../controllers/index.ts";
import { createUser, getUserById } from "../controllers/schema.ts";

export const usersRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get(
		"/:id",
		{
			schema: {
				tags: ["Users"],
				params: getUserById.shape.params,
			},
		},
		controller.getUserById,
	);

	route.get(
		"/",
		{
			schema: { tags: ["Users"] },
		},
		controller.getUsers,
	);

	route.post(
		"/",
		{
			schema: {
				tags: ["Users"],
				body: createUser.shape.body,
			},
		},
		controller.createUser,
	);
};
