import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controllers from "../controllers/index.ts";
import { createCourse, getCourseById } from "../controllers/schema.ts";

export const coursesRoutes: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get("/:id", { schema: getCourseById }, controllers.getCourseById);
	route.get("/", controllers.getCourses);
	route.post("/", { schema: createCourse }, controllers.createCourse);
};
