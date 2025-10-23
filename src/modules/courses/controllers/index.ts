import type { FastifyReply } from "fastify";
import * as service from "../services/index.ts";
import type { CreateCourseRequest, GetCoursesRequest } from "./types.ts";

export const getCourses = async (
	_req: GetCoursesRequest,
	reply: FastifyReply,
) => {
	try {
		const courses = await service.getCourses();

		return reply.status(200).send({
			statusCode: 200,
			data: courses,
		});
	} catch (error) {
		let message = "Error create user";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const createCourse = async (
	req: CreateCourseRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			body: { title, description },
		} = req;

		await service.createCourse({ title, description });

		return reply.status(201).send({
			statusCode: 201,
		});
	} catch (error) {
		let message = "Error create course";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};
