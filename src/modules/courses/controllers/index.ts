import type { FastifyReply } from "fastify";
import * as service from "../services/index.ts";
import type {
	CreateCourseRequest,
	GetCourseByIdRequest,
	GetCoursesRequest,
} from "./types.ts";

export const getCourseById = async (
	req: GetCourseByIdRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			params: { id },
		} = req;

		const course = await service.getCourseById({ id });

		return reply.status(200).send({
			statusCode: 200,
			message: "Course retrieved successfully",
			data: course,
		});
	} catch (error) {
		let message = "Error retrieving course";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const getCourses = async (
	req: GetCoursesRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			query: { search, orderBy, page },
		} = req;

		const courses = await service.getCourses({
			search,
			orderBy,
			page,
		});

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
			message: "Course created successfully",
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
