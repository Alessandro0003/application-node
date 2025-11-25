import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { checkRequestJwt } from "../../../middleware/check-request-jwt.ts";
import { checkUserRole } from "../../../middleware/check-user-role.ts";
import * as controllers from "../controllers/index.ts";
import {
	createCourse,
	getCourseById,
	getCourses,
} from "../controllers/schema.ts";

export const coursesRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get(
		"/:id",
		{
			preHandler: [checkRequestJwt],
			schema: {
				tags: ["Courses"],
				getCourseById,
			},
		},
		controllers.getCourseById as any,
	);

	route.get(
		"/",
		{
			schema: {
				tags: ["Courses"],
				getCourses,
			},
		},
		controllers.getCourses,
	);

	route.post(
		"/",
		{
			preHandler: [checkRequestJwt, checkUserRole("manager")],
			schema: {
				tags: ["Courses"],
				createCourse,
			},
		},
		controllers.createCourse as any,
	);
};
