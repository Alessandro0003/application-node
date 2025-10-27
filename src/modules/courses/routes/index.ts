import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
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
			schema: {
				tags: ["Courses"],
				getCourseById,
			},
		},
		controllers.getCourseById,
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
			schema: {
				tags: ["Courses"],
				createCourse,
			},
		},
		controllers.createCourse,
	);
};
