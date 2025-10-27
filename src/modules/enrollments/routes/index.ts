import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controllers from "../controllers/index.ts";
import { createEnrollment } from "../controllers/schema.ts";

export const enrollmentsRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.post(
		"/",
		{
			schema: {
				tags: ["Enrollments"],
				createEnrollment,
			},
		},
		controllers.createEnrollment,
	);
};
