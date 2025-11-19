import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controller from "../controllers/index.ts";
import { sessionUser } from "../controllers/schema.ts";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.post(
		"/sessions",
		{
			schema: {
				tags: ["Auth"],
				body: sessionUser.shape.body,
			},
		},
		controller.sessionUser,
	);
};
